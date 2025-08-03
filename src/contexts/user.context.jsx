import { createContext, useState } from "react";

export const UserContext = createContext({
  user: null,
  setUser: () => {},
  userLoading: true,
  setUserLoading: () => {},
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}