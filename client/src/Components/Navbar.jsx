import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [indicate, setindicate] = useState("signin");
  const [id, setid] = useState("");
  const navigate = useNavigate();
  const [isloading, setloading] = useState(true);

  useEffect(() => {
    setloading(true);
    console.log("useEffect Triggered");
    async function getuser() {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}userprof`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (data.code == 401) {
        setindicate("signin");
      } else if (data.code == 200) {
        console.log(data.data);
        setid(data.data.id);
        setindicate("logout");
      } else {
        navigate("/");
      }
      setloading(false);
    }
    getuser();
  }, [id, indicate]);

  if (isloading) {
    return (
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    toast.success(`Logout Successfully.`, {
      position: "top-right",
      autoClose: 2000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });

    setindicate("signin");
    setid("");

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setTimeout(() => {
      navigate("/");
      window.location.reload(true);
    }, 3000);
  };

  const getstatus = () => {
    console.log("Getting status");
    const content = [];
    if (indicate == "logout") {
      content.push(
        <li class="nav-item">
          <Link
            onClick={handleLogout}
            style={{
              paddingLeft: "20px",
              fontWeight: "1000",
              fontSize: "large",
              textDecoration: "none",
              color: "rgb(255, 87, 34)",
            }}
            class="nav-link"
            to={"/"}
          >
            Logout
          </Link>
        </li>
      );
      content.push(
        <li class="nav-item">
          <Link
            style={{
              paddingLeft: "20px",
              fontWeight: "1000",
              fontSize: "large",
              textDecoration: "none",
              color: "rgb(255, 87, 34)",
            }}
            class="nav-link"
            to={`/edit/${id}`}
          >
            Edit Profile
          </Link>
        </li>
      );
      content.push(
        <li class="nav-item">
          <Link
            style={{
              paddingLeft: "20px",
              fontWeight: "1000",
              fontSize: "large",
              textDecoration: "none",
              color: "rgb(255, 87, 34)",
            }}
            class="nav-link"
            to={`/chat/${id}`}
          >
            Chat
          </Link>
        </li>
      );
    } else {
      content.push(
        <li class="nav-item">
          <Link
            style={{
              paddingLeft: "20px",
              fontWeight: "1000",
              fontSize: "large",
              textDecoration: "none",
              color: "rgb(255, 87, 34)",
            }}
            class="nav-link"
            to={"/auth"}
          >
            SingIn/SingnUp
          </Link>
        </li>
      );
    }
    return content;
  };

  return (
    <div>
      <nav
        style={{ backgroundColor: "black", marginBottom: "0px" }}
        className="navbar navbar-expand-lg  "
      >
        <Link
          style={{
            fontWeight: "1000",
            fontSize: "xx-large",
            fontWeight: "bold",
            textDecoration: "none",
            color: "rgb(255, 87, 34)",
          }}
          class="nav-link"
          to={"/"}
        >
          PhilChar
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar_drop"
          aria-controls="navbar_drop"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon">|||</span>
        </button>
        <div class="collapse navbar-collapse" id="navbar_drop">
          <ul class="navbar-nav">
            <li
              style={{
                fontWeight: "1000",
                fontSize: "large",
              }}
              class="nav-item"
            >
              <Link
                style={{ textDecoration: "none", color: "rgb(255, 87, 34)" }}
                class="nav-link"
                to={"/ngos"}
              >
                Donate
              </Link>
            </li>
            <li class="nav-item">
              <Link
                style={{
                  paddingLeft: "20px",
                  fontWeight: "1000",
                  fontSize: "large",
                  textDecoration: "none",
                  color: "rgb(255, 87, 34)",
                }}
                class="nav-link"
                to={"/registerngo"}
              >
                Register NGO
              </Link>
            </li>

            {getstatus()}
          </ul>
        </div>
      </nav>
      <ToastContainer />
    </div>
  );
};

export default Navbar;
