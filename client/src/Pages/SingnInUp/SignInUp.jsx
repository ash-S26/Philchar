import React from "react";
import { Link } from "react-router-dom";

const SignInUp = () => {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "20%",
          border: "solid",
          borderWidth: "5px",
          borderRadius: "20px",
          width: "60%",
          padding: "20px",
          borderColor: "white",
        }}
      >
        <div
          style={{
            width: "47%",
            height: "400px",
            border: "solid",
            borderWidth: "5px",
            borderRadius: "20px",
            display: "inline-block",
            borderColor: "white",
            textAlign: "center",
            fontSize: "50px",
            color: "white",
            padding: "50px",
          }}
        >
          NGO
          <br />
          <p>
            NGO's can SignIn using their email and password used during
            registration for editing details.
          </p>
          <br />
          <button type="button" class="btn btn-primary">
            <Link style={{ color: "white" }} to="/ngo/signin">
              SignIn
            </Link>
          </button>
        </div>
        <div
          style={{
            width: "47%",
            height: "400px",
            border: "solid",
            borderWidth: "5px",
            borderRadius: "20px",
            display: "inline-block",
            marginLeft: "45px",
            borderColor: "white",
            textAlign: "center",
            fontSize: "50px",
            color: "white",
            padding: "50px",
          }}
        >
          Philantropist
          <br />
          <p>
            Philantropist can register their feild of intrest and create profile
            using SignUp functionality.
          </p>
          <br />
          <button type="button" class="btn btn-primary">
            <Link style={{ color: "white" }} to="/phil/signin">
              SignIn
            </Link>
          </button>
          <button
            style={{ marginLeft: "10px" }}
            type="button"
            class="btn btn-primary"
          >
            <Link style={{ color: "white" }} to="/phil/signup">
              SignUp
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInUp;
