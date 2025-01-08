import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../global";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = () => {
    axios
      .post(`${SERVER_URL}/user/login`, { username, password })
      .then((response) => {
        const { username } = response.data;
        console.log("Username:", username);

        // Store data in Local Storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.username);

        // Show success message
        enqueueSnackbar("Login Successfully", { variant: "success" });

        // Navigate to the home page
        navigate("/home", { state: { username } });
      })
      .catch((error) => {
        // Show error message
        enqueueSnackbar("Login failed", { variant: "error" });
        console.error(error);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg" style={{ width: "400px" }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Login</h2>
          <div className="form-group mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button
            className="btn btn-primary w-100"
            onClick={handleLogin}
          >
            Login
          </button>
          <div className="mt-3 text-center">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
