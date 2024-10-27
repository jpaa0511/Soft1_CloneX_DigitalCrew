import { useReducer } from "react";
import { UserContext } from "./UserContext";
import { UserReducer } from "../Reducers/UserRedus";
import { useAuth } from "../hooks/useAuth";

const initialState = {
  logged: false,
  user: {},
  errorMessage: null,
};

const init = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const isLogged = !user ? false : true;
  const state = {
    logged: isLogged,
    user,
  };
  return state;
};

export const UserProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(UserReducer, initialState, init);

  const {
    logInUser,
    logOutUser,
    signUpUser,
    logInWithGoogle,
    logInWithFacebook,
  } = useAuth(dispatch);

  return (
    <UserContext.Provider
      value={{
        ...userState,
        logInUser,
        logOutUser,
        signUpUser,
        logInWithGoogle,
        logInWithFacebook,
        errorMessage: userState.errorMessage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
