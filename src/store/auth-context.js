import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

export const AuthContextProider = (props) => {
  // create local storage of token so refresh doesn't lose token of user
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  // but this simply converts this truthy or falsy value to a true or false Boolean value. If token is a string that's not empty, this will return true, if token is a string that is empty, this will return false.
  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    // remove local storage when logout
    localStorage.removeItem("token");
  };

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    // create local storage of token so refresh doesn't lose token of user
    localStorage.setItem("token", token);

    const remainingTime = calculateRemainingTime(expirationTime);

    setTimeout(logoutHandler, remainingTime);
  };
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
