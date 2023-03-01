import { useState } from "react";
import axios from "axios";
import { useContext, useEffect } from "react";
import AuthContext from "../store/authContext";
const Auth = () => {
  const AuthCtx = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);
  const [errorMessage, setErrorMessage] = useState(true);

  useEffect(() => {
    if (errorMessage) {
      errorHandler();
    }
  }, []);

  const errorHandler = () => {
    if (username.length < 1 || password.length < 1) {
      return false;
    } else {
      return true;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const body = {
      username,
      password,
    };

    if (!errorHandler()) {
      console.log(`there was a error`);
      setErrorMessage(false);
      return;
    } else {
      setErrorMessage(true);
    }

    const url = "https://socialmtn.devmountain.com";

    await axios
      .post(register ? `${url}/register` : `${url}/login`, body)
      .then((res) => {
        console.log(" the response is here!", res.data);
        AuthCtx.login(res.data.token, res.data.exp, res.data.userId);
      })
      .catch((err) => {
        console.error(err);
        setUsername("");
        setPassword("");
      });

    console.log(username);

    console.log("submitHandler called");
  };

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          className="form-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            errorHandler();
          }}
        />
        <input
          className="form-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!errorMessage ? (
          <p style={{ color: "red" }}>please type into both inputs</p>
        ) : null}
        <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
      </form>
      <button className="form-btn" onClick={() => setRegister(!register)}>
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;
