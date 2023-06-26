import React, { useEffect, useState } from "react";
import NgoTags from "../../Components/NgoTags";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const colors = [
  "#BF9D9D",
  "#A3CCBE",
  "#9CC95C",
  "#F28589",
  "#767FA6",
  "#44D362",
  "#BF9D9D",
];

const ListNgos = () => {
  const [searchbyname, setsearchbyname] = useState("");
  const [searchbytags, setsearchbytags] = useState("");
  const [allngos, setallngos] = useState();
  const [isloading, setloading] = useState(true);
  const navigate = useNavigate();

  axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

  useEffect(() => {
    async function fetchallngos() {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}allngos`,
        {
          method: "GET",
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      if (data.code == 401) {
        navigate("/auth");
      }

      const list = data.data;
      setallngos(list);
      console.log("all ngos - ", allngos);
      setloading(false);
    }
    fetchallngos();
  }, []);

  const handlesearch = async (e) => {
    e.preventDefault();
    console.log(e);
    if (searchbyname.length > 0) {
      setloading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}ngo/name`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            ngoname: searchbyname,
          }),
        }
      );

      const data = await response.json();
      if (data.code == 500) {
        alert("No Match");
      }
      const list = data.data;
      setallngos(list);

      setloading(false);
    } else if (searchbytags.length > 0) {
      setloading(true);

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}ngo/tag`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            ngotags: searchbytags,
          }),
        }
      );

      const data = await response.json();
      if (data.code == 500) {
        alert("No Match");
      }
      const list = data.data;
      setallngos(list);

      setloading(false);
    } else {
      alert(
        "please enter name of NGO or search by tags of NGO you are looking for."
      );
    }
    setsearchbyname("");
    setsearchbytags("");
  };

  if (isloading) {
    return (
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  const gettags = (key) => {
    var content = [];
    var i = 0;
    for (let tag in key.ngotags) {
      i++;
      content.push(
        <span name={tag} id={i} class="btn btn-small">
          {key.ngotags[tag]}
        </span>
      );
    }
    return content;
  };

  const getallngos = () => {
    var content = [];
    var i = 0;

    for (let key in allngos) {
      i++;
      content.push(
        <div
          class="card text-white mb-12"
          style={{
            marginLeft: "200px",
            marginRight: "200px",
            backgroundColor: `${colors[i % colors.length]}`,
            marginBottom: "20px",
          }}
        >
          <div
            class="card-header"
            style={{
              color: "black",
              fontWeight: "500",
              display: "flex",
              justifyContent: "space-between",
              flexGrow: "1",
              marginBottom: "0px",
              paddingBottom: "0px",
            }}
          >
            <h2
              style={{
                color: "black",
                fontWeight: "600",
                paddingLeft: "20px",
                paddingTop: "10px",
              }}
            >
              {allngos[key].ngoname.toUpperCase()}
            </h2>
            <p class="card-text">{gettags(allngos[key])}</p>
          </div>
          <div class="card-body">
            <h5 class="card-title">
              {allngos[key].ngocity +
                ", " +
                allngos[key].ngostate +
                ", " +
                allngos[key].ngozip}
            </h5>
          </div>
          <Link
            to={`/ngo/${allngos[key]._id}`}
            class="btn btn-primary"
          >{`Get More Details About ${allngos[key].ngoname}`}</Link>
        </div>
      );
    }
    return content;
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://wallpaperaccess.com/full/1768590.jpg')",
        marginTop: "-20px",
        padding: "100px",
        paddingTop: "20px",
      }}
    >
      <NgoTags />
      <form
        style={{ paddingTop: "20px", color: "white" }}
        onSubmit={handlesearch}
      >
        <div
          class="form-group"
          style={{ padding: "30px", paddingBottom: "0px" }}
        >
          <label for="exampleInputEmail1">Search NGO By Name</label>
          <input
            onChange={(e) => {
              setsearchbyname(e.target.value);
            }}
            value={searchbyname}
            type="text"
            class="form-control"
            placeholder="Goonj"
          />
        </div>
        <div class="form-group" style={{ padding: "30px", paddingTop: "0px" }}>
          <label for="exampleInputPassword1">Search NGOs By Tag</label>
          <input
            onChange={(e) => {
              setsearchbytags(e.target.value);
            }}
            value={searchbytags}
            type="text"
            class="form-control"
            autoComplete="false"
            placeholder="Tags must be space seperated, All tags can be seen at page top. Ex- Children Disaster"
          />
        </div>

        <input
          type="submit"
          class="btn btn-primary"
          style={{
            height: "30px",
            width: "150px",
            alignItems: "center",
            alignContent: "center",
            display: "flex",
            justifyContent: "space-evenly",
            margin: "0 auto",
            paddingBottom: "30px",
          }}
          value={"Search"}
        />
      </form>
      <br />

      {getallngos()}
    </div>
  );
};

export default ListNgos;
