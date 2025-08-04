import { createContext, useState, useEffect } from "react";

import { createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";


export const UserContext = createContext({
  user: null,
  setUser: () => {},
  userLoading: true,
  setUserLoading: () => {},
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const value = { 
    user: currentUser, 
    setUser: setCurrentUser,
    userLoading,
    setUserLoading
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      setCurrentUser(user);
      setUserLoading(false);
      if(user) {
        createUserDocumentFromAuth(user);
      }
    });
    
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
