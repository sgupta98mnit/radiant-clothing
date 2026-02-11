# VPS Deployment Behind Caddy (Path-Based Routing)

This repo is deployed on a single VPS alongside other projects using Caddy as the front door. Caddy terminates TLS (HTTPS), listens on ports 80/443, and reverse proxies to Docker containers. Only Caddy should expose ports 80/443 to the host.

Routing model:
- `/` -> `portfolio`
- `/projects/<name>` -> each project container (example: `radiant-clothing` at `/projects/radiant-clothing`)

**Overview**
Caddy is a modern web server and reverse proxy with automatic HTTPS. We use it with Docker to centralize TLS and route multiple apps by path. Caddy runs on a shared Docker network and proxies to internal container names (Docker DNS). Only Caddy publishes host ports 80/443; app containers stay internal.

**Common Errors & Fixes**
Issue we hit:
- Browser error: “bundle.js loaded with MIME type text/html” and “expected expression, got '<'”
- `curl` showed `bundle.js` returning HTML (`index.html`)
- Caddy returned `502` on `/projects/radiant-clothing`
- Inside caddy container: `wget http://radiant-clothing:3000` failed with `bad address`

Root cause:
- Caddy and `radiant-clothing` were on different Docker networks, so Docker DNS could not resolve the container name. Container-name DNS only works when both containers share a network. This is the standard pattern for Docker reverse proxies: upstreams must be reachable on a shared network, otherwise Caddy returns `502`.

Fix:
- Connect the app container to the same network as Caddy:
```
docker network connect web radiant-clothing
```
- Verify from inside Caddy:
```
docker exec -it caddy sh -lc 'wget -qSO- http://radiant-clothing:3000/ 2>&1 | head -n 20'
```

**Deployment Steps**
1. Create the shared network (idempotent):
```
docker network create web || true
```
2. Run/attach Caddy on the `web` network (do this once):
```
# If Caddy is already running, just connect it:
docker network connect web caddy || true
```
3. For every app container, ensure it is on `web` (compose or manual):
```
# After the container is up:
docker network connect web <container>
```
4. Do not publish app ports to the host. Only Caddy publishes 80/443. Avoid conflicts like `-p 3000:3000` if another app already uses 3000. Prefer `expose:` in compose so ports are internal only.

Verification commands:
```
docker ps
```
```
docker inspect <container> --format '{{range $k,$v := .NetworkSettings.Networks}}{{$k}} {{end}}'
```
```
docker exec -it caddy sh -lc 'wget -qSO- http://<service>:<port>/ 2>&1 | head -n 20'
```
```
curl -vkI https://sumit-gupta.cloud/projects/<name>/
```

**Caddyfile Template**
The project-specific block must appear before the default `handle`.
```
sumit-gupta.cloud, www.sumit-gupta.cloud {
  encode zstd gzip

  redir /projects/radiant-clothing /projects/radiant-clothing/ 308
  handle_path /projects/radiant-clothing/* {
    reverse_proxy radiant-clothing:3000
  }

  handle {
    reverse_proxy portfolio:3000
  }
}
```

**Project Checklist**
- Put the project container on the shared `web` network with Caddy.
- Don’t publish app ports to the host; only Caddy publishes 80/443.
- Add a Caddy route block for `/projects/<name>` (before the default `handle`).
- If the React app is under a subpath, set its base path/homepage so static asset URLs resolve correctly.
- Validate routing: ensure `/static/*` requests return JS/CSS content-types, not HTML.
