import React, { useState } from "react";
import api from '../services/AuthService';
import { useNavigate } from "react-router-dom";
import { useFlashMessage } from "../context/FlashMessageContext";

const Form = ({ route, method }) => {
  const showMessage = useFlashMessage(); // Get the showMessage function
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameOnChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordOnChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(route, {
        username,
        password,
      });
      if (response.status === 200 || response.status === 201) {
        if (method === "login") {
          localStorage.setItem('data', response.data);
          localStorage.setItem('access', response.data.access);
          localStorage.setItem('refresh', response.data.refresh);
          showMessage('Login Successful, Happy Learning', 'success');
          navigate("/");
        } else {
          showMessage('Register Successful, Login to continue', 'success');
          navigate("/login");
        }
      } else {
        showMessage("Whoops, response=", `${error}`);
        console.log(response);
      }
    } catch (error) {
      showMessage('Network Error, Make Sure You Are CONNECTED to the Internet', 'error');
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <div className="starry-bg"></div>
      <div className="card">
        <h1 className="form-title">{method}</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="username" className="neon-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameOnChange}
              className="neon-input"
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="neon-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordOnChange}
              className="neon-input"
            />
          </div>
          <div className="submit-container">
            <input
              type="submit"
              value="Submit"
              className="neon-button"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
