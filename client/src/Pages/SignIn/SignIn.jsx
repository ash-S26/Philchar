import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  console.log(pathname);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(
      "process.env.REACT_APP_BACKEND_URL - ",
      process.env.REACT_APP_BACKEND_URL
    );
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    console.log(data.token);
    let token = data.token;
    localStorage.setItem("token", token);
    if (pathname.includes("phil")) {
      localStorage.setItem("user", "phil");
    } else {
      localStorage.setItem("user", "ngo");
    }

    navigate("/");
    window.location.reload(true);
  };

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "30%",
          border: "solid",
          borderWidth: "5px",
          borderRadius: "20px",
          width: "40%",
          padding: "20px",
          borderColor: "white",
        }}
      >
        <form onSubmit={handleFormSubmit}>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              onChange={(e) => setemail(e.target.value)}
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
