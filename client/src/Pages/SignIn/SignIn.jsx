import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  async function handlevalidation() {
    if (email.length == 0) {
      toast.error("Please enter email address.", {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return false;
    } else if (password.length == 0) {
      toast.error("Please enter password.", {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return false;
    }
    return true;
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const verify = await handlevalidation();
    console.log(verify);
    if (verify == false) {
      return;
    }

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
    if (data.status == 400) {
      toast.error("Invalid email or password.", {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }
    if (data.status == 500) {
      toast.error(`${data.message}`, {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }
    toast.success("Login Successful.", {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });

    let token = data.token;
    localStorage.setItem("token", token);
    if (pathname.includes("phil")) {
      localStorage.setItem("user", "phil");
    } else {
      localStorage.setItem("user", "ngo");
    }
    setTimeout(() => {
      navigate("/");
      window.location.reload(true);
    }, 3000);
  };

  return (
    <div
      style={{
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        marginTop: "10px",
        height: "100%",
        backgroundImage: "url('https://wallpaperaccess.com/full/1768590.jpg')",
        paddingTop: "100px",
        paddingBottom: "250px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div
          className="row"
          style={{
            border: "solid",
            borderWidth: "5px",
            borderRadius: "20px",
            width: "60%",
            height: "100%",
            padding: "20px",
            borderColor: "white",
          }}
        >
          <div class="col-md-6 col-12">
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
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
