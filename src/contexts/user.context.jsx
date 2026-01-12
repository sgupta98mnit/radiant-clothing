import { createContext, useEffect, useReducer } from "react";

import { createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  user: null,
  setUser: () => {},
  userLoading: true,
  setUserLoading: () => {},
});

export const USER_ACTION_TYPES = {
  SET_USER: "SET_CURRENT_USER",
  SET_USER_LOADING: "SET_USER_LOADING",
};

const INITIAL_STATE = {
  user: null,
  userLoading: true,
};

const userReducer = (state, action) => {
  console.log("dispatched");

  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_USER_LOADING":
      return { ...state, userLoading: action.payload };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [{ user, userLoading }, dispatch] = useReducer(
    userReducer,
    INITIAL_STATE
  );

  console.log(user, userLoading);

  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_USER, payload: user });
  };

  const setUserLoading = (loading) => {
    dispatch({ type: USER_ACTION_TYPES.SET_USER_LOADING, payload: loading });
  };

  const value = {
    user,
    setUser: setCurrentUser,
    userLoading,
    setUserLoading,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      setCurrentUser(user);
      setUserLoading(false);
      if (user) {
        createUserDocumentFromAuth(user);
      }
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
