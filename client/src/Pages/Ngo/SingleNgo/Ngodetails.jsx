import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ngo.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Payment from "../../Payment/Payment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Ngodetails = () => {
  const { id } = useParams();
  const [ngodata, setngodata] = useState(undefined);
  const [isloading, setloading] = useState(true);
  const [amount, setamount] = useState(0);
  const [user, setuser] = useState("");
  const navigate = useNavigate();

  axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

  useEffect(() => {
    // if (!localStorage.getItem("token")) navigate("/auth");
    setloading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}userprof`)
      .then((response) => {
        const data = response.data.data;

        if (data.code != undefined && data.code == 401) {
          navigate("/");
        }

        // console.log("userprof - ", data);
        setuser(data.id);
      });
    // .catch((err) => {
    //   toast.error("Something went wrong.", {
    //     position: "bottom-right",
    //     autoClose: 8000,
    //     pauseOnHover: true,
    //     draggable: true,
    //     theme: "dark",
    //   });

    //   setTimeout(() => {
    //     setloading(false);
    //     navigate("/");
    //   }, 1000);
    // });

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}ngo/${id}`)
      .then((response) => {
        const data = response.data;
        console.log("data here - ", response.data);
        if (data.code != undefined && (data.code == 401 || data.code == 400)) {
          navigate("/");
        }
        // console.log("ngo page - ", data);

        setngodata(data.data);
        setloading(false);
      });
    // .catch((err) => {
    //   toast.error("Something went wrong.", {
    //     position: "bottom-right",
    //     autoClose: 8000,
    //     pauseOnHover: true,
    //     draggable: true,
    //     theme: "dark",
    //   });

    //   setTimeout(() => {
    //     setloading(false);
    //     navigate("/");
    //   }, 1000);
    // });
  }, []);

  const gettags = (key) => {
    var content = [];
    var i = 0;
    for (let tag in key.ngotags) {
      i++;
      content.push(
        <button
          style={{ float: "right", marginRight: "5%" }}
          type="button"
          class="btn btn-outline-success"
        >
          {key.ngotags[tag]}
        </button>
      );
    }
    return content;
  };

  const getpreviousworks = () => {
    var content = [];
    var i = 0;
    for (let work in ngodata.works) {
      i++;
      content.push(
        <li style={{ color: "white" }} id={i}>
          {ngodata.works[work]}
        </li>
      );
    }
    return content;
  };

  // if (isloading) {
  //   return (
  //     <div class="d-flex justify-content-center">
  //       <div class="spinner-border" role="status">
  //         <span class="sr-only">Loading...</span>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {ngodata == undefined ? (
        <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <header style={{ marginBottom: "0px", paddingBottom: "0px" }}>
            <h1>
              {ngodata.ngoname != undefined
                ? ngodata.ngoname.toUpperCase()
                : null}

              {gettags(ngodata)}
            </h1>

            <p style={{ paddingLeft: "50px" }}>
              {ngodata.ngocity +
                ", " +
                ngodata.ngostate +
                ", " +
                ngodata.ngozip}
            </p>
          </header>
          <div
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              marginTop: "0px",
              paddingTop: "0px",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundImage:
                "url('https://wallpaperaccess.com/full/1768590.jpg')",
            }}
          >
            <div
              style={{
                display: "flex",
                flexGrow: "1",
                justifyContent: "space-evenly",
              }}
            >
              <div
                style={{
                  border: "solid",
                  borderColor: "white",
                  borderRadius: "20px",
                  padding: "20px",
                  maxWidth: "50%",
                  wordWrap: "break-word",
                }}
              >
                <h2>Vision</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  luctus ligula metus, vehicula lacinia ipsum pellentesque nec.
                  Duis porttitor, lectus quis laoreet porttitor, ex ligula
                  feugiat neque, ut lobortis augue nisl eu ante. Morbi dapibus
                  vitae ex ac finibus. Maecenas posuere lobortis magna, in
                  tempus metus mollis a. Praesent quis elementum est. Sed
                  consectetur, tortor aliquam semper consectetur, enim eros
                  molestie mauris, sit amet tempor risus urna sed eros. Praesent
                  placerat elit vel aliquet pharetra. Cras est dolor, tempus id
                  ante ut, efficitur ultrices ante. Morbi mattis, sem ac rhoncus
                  consequat, sem tellus fermentum tellus, sit amet condimentum
                </p>
              </div>
              <div>
                <iframe
                  height={"300px"}
                  width={"500px"}
                  borderRadius={"20px"}
                  src={ngodata.video}
                ></iframe>
              </div>
            </div>
            <div
              style={{
                border: "solid",
                borderColor: "white",
                borderRadius: "20px",
                padding: "20px",
                maxWidth: "100%",
                wordWrap: "break-word",
                margin: "50px",
              }}
            >
              <h2>Previous Works</h2>
              <ul>{getpreviousworks()}</ul>
            </div>

            <Carousel
              infiniteLoop
              showStatus={true}
              showIndicators={true}
              showThumbs={false}
            >
              {ngodata.images != undefined
                ? ngodata.images.map((image, index) => {
                    return (
                      <img
                        style={{ height: "800px", width: "90%" }}
                        src={image}
                        alt={`${index} slide`}
                      />
                    );
                  })
                : null}
            </Carousel>
            <div
              style={{
                border: "solid",
                borderColor: "white",
                borderRadius: "20px",
                margin: "50px",
                padding: "20px",
                maxWidth: "100%",
                wordWrap: "break-word",
              }}
            >
              <h2 style={{ display: "flex", justifyContent: "center" }}>
                Contact Details
              </h2>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <p style={{ margin: "10px" }}>{ngodata.ngoemail}</p>
                <p style={{ margin: "10px" }}>{ngodata.ngoprimaryphone}</p>
                <p style={{ margin: "10px" }}>{ngodata.ngosecondaryphone}</p>
              </div>
            </div>

            <div
              style={{
                border: "solid",
                borderColor: "white",
                borderRadius: "20px",
                margin: "50px",
                padding: "20px",

                wordWrap: "break-word",
              }}
            >
              <h2 style={{ display: "flex", justifyContent: "center" }}>
                Donate Safely Using Our Platform
              </h2>

              <label
                style={{ width: "30%", marginLeft: "45%" }}
                for="inputamount"
              >
                Amount To Donate
              </label>
              <input
                onChange={(e) => {
                  setamount(e.target.value);
                }}
                value={amount}
                type="text"
                class="form-control"
                id="inputamount"
                placeholder="1000 (amount is in rupees)"
                style={{ width: "30%", marginLeft: "35%" }}
              />
              <Payment
                ngoname={ngodata.ngoname}
                ngoid={ngodata._id}
                amount={amount}
                sender={user}
              />

              <h2 style={{ display: "flex", justifyContent: "center" }}>
                Scan QR To Donate
              </h2>

              <Carousel
                infiniteLoop
                showStatus={true}
                showIndicators={true}
                showThumbs={false}
              >
                {ngodata.qrimages != undefined
                  ? ngodata.qrimages.map((image, index) => {
                      return (
                        <img
                          style={{ height: "500px", width: "300px" }}
                          src={image}
                          alt={`${index} slide`}
                        />
                      );
                    })
                  : null}
              </Carousel>
            </div>
            <br />
            <br />
            <br />
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Ngodetails;
