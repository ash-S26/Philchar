import React, { useState } from "react";
import NgoTags from "../../Components/NgoTags";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [tags, settags] = useState("");
  const [vision, setvision] = useState("");
  const [works, setworks] = useState([""]);
  const navigate = useNavigate();

  const handleAddClick = (e) => {
    const list = [...works];
    list.push("");
    setworks(list);
  };

  const handleRemoveClick = (i) => {
    const list = [...works];
    list.splice(i, 1);
    setworks(list);
    return;
  };

  const handleNgoWork = (e, i) => {
    const list = [...works];
    list[i] = e.target.value;
    setworks(list);
  };

  async function handlevalidation() {
    if (
      name.length == 0 ||
      email.length == 0 ||
      phone.length < 10 ||
      password.length == 0 ||
      tags.length == 0 ||
      vision.length == 0
    ) {
      toast.error(
        "All details are mandatory and should follow example details.",
        {
          position: "bottom-right",
          autoClose: 8000,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        }
      );
      return false;
    }
  }

  const handlePhilFormSubmit = async (e) => {
    e.preventDefault();

    const verify = await handlevalidation();

    if (verify == false) return;

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}phil/signup`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          phone: phone,
          email: email,
          password: password,
          tags: tags,
          vision: vision,
          works: works,
        }),
      }
    );

    const data = await response.json();
    console.log(data.data);

    if (data.data == "User Already exists") {
      toast.error("User Already exists", {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else if (data.data == "Error user creation") {
      toast.error("Error occoured in user creation", {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else {
      toast.success(`SignUp Successful ${name}`, {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }

    setTimeout(() => {
      navigate("/auth");
    }, 3000);
  };

  return (
    <div
      style={{
        padding: "200px",
        paddingTop: "20px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: "url('https://wallpaperaccess.com/full/1768590.jpg')",
      }}
    >
      <NgoTags />
      <form onSubmit={handlePhilFormSubmit}>
        <div class="form-row">
          <h1
            style={{
              color: "white",
              margin: "auto auto",
              paddingBottom: "10px",
            }}
          >
            Philantropist Details
          </h1>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="name">Full Name</label>
            <input
              onChange={(e) => {
                setname(e.target.value);
              }}
              value={name}
              type="text"
              class="form-control"
              id="name"
              placeholder="Sahil Dharme"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="phone">Phone</label>
            <input
              onChange={(e) => {
                setphone(e.target.value);
              }}
              value={phone}
              type="text"
              class="form-control"
              id="phone"
              placeholder="+91-9370097132"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="email">Email</label>
            <input
              onChange={(e) => {
                setemail(e.target.value);
              }}
              value={email}
              type="text"
              class="form-control"
              id="email"
              placeholder="sahildharme87@gmail.com"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="password">Password</label>
            <input
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              value={password}
              type="text"
              class="form-control"
              id="password"
              placeholder="This will be used as your sign in password."
            />
          </div>
        </div>

        <div class="form-group">
          <label for="vision">Vision</label>
          <input
            onChange={(e) => {
              setvision(e.target.value);
            }}
            value={vision}
            type="text"
            class="form-control"
            id="vision"
            placeholder="I would like to see a world with 0 poverty."
          />
        </div>

        <div class="form-group">
          <label for="tags">Feild of works (Tags Space Separated)</label>
          <input
            onChange={(e) => {
              settags(e.target.value);
            }}
            value={tags}
            type="tags"
            class="form-control"
            id="tags"
            placeholder="Children Nature"
          />
        </div>

        {works.length == 0 ? (
          <button
            type="button"
            onClick={handleAddClick}
            style={{
              height: "30px",
              width: "200px",

              alignItems: "center",
              alignContent: "center",
              display: "flex",
              justifyContent: "space-evenly",
              margin: "0 auto",
              marginBottom: "20px",
            }}
            class="btn btn-primary"
          >
            Add Past Works
          </button>
        ) : null}

        {works.length
          ? works.map((work, i) => {
              return (
                <div>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label for="philwork">Philantropist Past Work</label>
                      <textarea
                        onChange={(e) => handleNgoWork(e, i)}
                        value={work}
                        style={{
                          width: "100%",
                        }}
                        class="form-control"
                        id="philwork"
                        placeholder="Donated 5 Laks for Tree Plantation in kunjvihar to save nature on 26 march 2002, source of proof - https://Goonj.org/tree-plantation-at-kunjvihar"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      handleRemoveClick(i);
                    }}
                    style={{
                      height: "30px",
                      width: "200px",

                      alignItems: "center",
                      alignContent: "center",
                      display: "flex",
                      justifyContent: "space-evenly",
                      margin: "0 auto",
                      marginBottom: "20px",
                    }}
                    class="btn btn-primary"
                  >
                    Remove Work
                  </button>
                  {works.length - 1 == i ? (
                    <button
                      type="button"
                      onClick={handleAddClick}
                      style={{
                        height: "30px",
                        width: "230px",

                        alignItems: "center",
                        alignContent: "center",
                        display: "flex",
                        justifyContent: "space-evenly",
                        margin: "0 auto",
                        marginBottom: "20px",
                      }}
                      class="btn btn-primary"
                    >
                      Add More Past Works
                    </button>
                  ) : null}
                </div>
              );
            })
          : null}
        <button
          type="submit"
          style={{
            height: "30px",
            width: "100px",

            alignItems: "center",
            alignContent: "center",
            display: "flex",
            justifyContent: "space-evenly",
            margin: "0 auto",
            marginBottom: "20px",
          }}
          class="btn btn-primary"
        >
          Sign Up
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
