import { useState, useEffect, useCallback, createContext } from "react";

let logoutTimer;
console.log(logoutTimer);
const AuthContext = createContext({
  token: "",
  login: () => {},
  logout: () => {},
  userId: null,
});

const calculateRemainingTime = (exp) => {
  const currentTime = new Date().getTime();
  const expTime = exp;
  const remainingTime = expTime - currentTime;
  return remainingTime;
};

const getLocalData = () => {
  const storedToken = localStorage.getItem("token");
  const storedExp = localStorage.getItem("exp");

  const remainingTime = calculateRemainingTime(storedExp);

  if (remainingTime <= 1000 * 60 * 30) {
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const localData = getLocalData();

  let initialToken;
  if (localData) {
    initialToken = localData.token;
  }

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(null);

  const logout = () => {
    setToken(null);
    setUserId(null);

    localStorage.clear();
    console.log("dghds");

    if (logoutTimer === 0) {
      clearTimeout(logoutTimer);
      return "string";
    }
    return true;
  };

  const login = (token, ext, userId) => {
    setToken(token);
    setUserId(userId);
    console.log("hit");
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("ext", ext);
    let remainingTime = calculateRemainingTime(ext);
    logoutTimer = setTimeout(logout, remainingTime);
  };

  const contextValue = {
    token,
    login,
    logout,
    userId,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
