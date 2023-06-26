import React from "react";
import { Link } from "react-router-dom";

const SignInUp = () => {
  return (
    <div
      style={{
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        marginTop: "10px",
        backgroundImage: "url('https://wallpaperaccess.com/full/1768590.jpg')",
        padding: "50px",
        paddingBottom: "100px",
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
            padding: "20px",
            borderColor: "white",
          }}
        >
          <div class="col-md-6 col-12">
            <div
              style={{
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
              <button
                style={{ marginLeft: "10px" }}
                type="button"
                class="btn btn-primary"
              >
                <Link style={{ color: "white" }} to="/registerngo">
                  SignUp
                </Link>
              </button>
            </div>
          </div>

          <div class="col-md-6 col-12">
            <div
              style={{
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
              PHIL
              <br />
              <p>
                Philantropist can register their feild of intrest and create
                profile using SignUp functionality.
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
      </div>
    </div>
  );
};

export default SignInUp;
