import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SignUp = (props) => {
  const { ShowAlert } = props;
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let history = useHistory();

  const host = "http://localhost:5000";
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    // API CALL
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    // eslint-disable-next-line
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      history.push("/");
      ShowAlert("Account Created Success ", "success");
    } else {
      ShowAlert("invalid credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h2>SignUp to Continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            aria-describedby="emailHelp"
            onChange={onChange}
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
            className="form-control"
            name="password"
            id="password"
            minLength={5}
            required
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            name="cpassword"
            id="cpassword"
            minLength={5}
            required
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          SignUp
        </button>
      </form>
    </div>
  );
};

export default SignUp;
