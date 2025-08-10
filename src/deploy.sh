#!/usr/bin/env bash
set -euo pipefail

# --- CONFIG ---
TARGET_DIR="$(cd "$(dirname "$0")"/../.. && pwd)/radiant-clothing"
NGINX_RELOAD_WITH_SUDO=${NGINX_RELOAD_WITH_SUDO:-1}  # set to 0 to skip sudo
# ---------------

# Sanity checks
if [[ ! -f package.json ]]; then
  echo "✖ package.json not found in $(pwd)"
  exit 1
fi

echo "→ Project root: $(pwd)"
echo "→ Target dir:   ${TARGET_DIR}"

# Install deps
if [[ -f package-lock.json ]]; then
  echo "→ Running npm ci"
  npm ci
else
  echo "→ Running npm install"
  npm install
fi

# Build
echo "→ Building app (npm run build)"
npm run build

# Detect build output
BUILD_DIR=""
if [[ -d "build" ]]; then
  BUILD_DIR="build"
elif [[ -d "dist" ]]; then
  BUILD_DIR="dist"
else
  echo "✖ Could not find build output (expected ./build or ./dist)."
  exit 1
fi
echo "→ Build output: ${BUILD_DIR}/"

# Ensure target dir exists
mkdir -p "${TARGET_DIR}"

# Deploy (atomic-ish) using rsync
echo "→ Copying files to ${TARGET_DIR} ..."
rsync -ah --delete "${BUILD_DIR}/" "${TARGET_DIR}/"

# Drop a deploy marker
{
  date +"%Y-%m-%d %H:%M:%S"
  echo "commit=$(git rev-parse --short HEAD 2>/dev/null || echo no-git)"
} > "${TARGET_DIR}/.deployed_at"

# Reload Nginx
echo "→ Reloading Nginx..."
RELOAD_CMD="systemctl reload nginx"
if ! command -v systemctl >/dev/null 2>&1; then
  RELOAD_CMD="nginx -s reload"
fi

if [[ "${NGINX_RELOAD_WITH_SUDO}" -eq 1 ]]; then
  sudo ${RELOAD_CMD}
else
  ${RELOAD_CMD}
fi

echo "✔ Done!"
