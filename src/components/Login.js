import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const {ShowAlert}=props
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let history = useHistory();

  const host = "http://localhost:5000";
  const handleSubmit = async (e) => {
    e.preventDefault();
    // API CALL
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success===true) {
      localStorage.setItem("token", json.authToken);
      history.push("/");
      ShowAlert('Logged in Successfully ','success')
    } else {
      ShowAlert('invalid credentials','danger')
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h2>Login to Continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={credentials.email}
            onChange={onChange}
            className="form-control"
            name="email"
            id="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={credentials.password}
            onChange={onChange}
            className="form-control"
            name="password"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
