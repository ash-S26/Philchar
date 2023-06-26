import React, { useState } from "react";
import NgoTags from "../../Components/NgoTags";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";

const RegisterNgo = () => {
  const [works, setworks] = useState([""]);
  const [images, setImages] = useState([]);
  const [qrimages, setqrImages] = useState([]);
  const [video, setVideo] = useState("");
  const [ngoaccountnumber, setngoaccountnumber] = useState("");
  const [ngoifsc, setngoifsc] = useState("");
  const [ngobranch, setngobranch] = useState("");
  const [ngoprimaryphone, setngoprimaryphone] = useState("");
  const [ngosecondaryphone, setngosecondaryphone] = useState("");
  const [ngoname, setngoname] = useState("");
  const [ngoid, setngoid] = useState("");
  const [ngoemail, setngoemail] = useState("");
  const [ngopassword, setngopassword] = useState("");
  const [ngoadd1, setngoadd1] = useState("");
  const [ngoadd2, setngoadd2] = useState("");
  const [ngocity, setngocity] = useState("");
  const [ngostate, setngostate] = useState("");
  const [ngozip, setngozip] = useState("");
  const [ngotags, setngotags] = useState("");
  var navigate = useNavigate();

  const handleRegisterngo = (e) => {
    e.preventDefault();
    console.log(images);

    fetch(`${process.env.REACT_APP_BACKEND_URL}registerngo`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        ngoname: ngoname,
        ngoid: ngoid,
        ngoemail: ngoemail,
        ngopassword: ngopassword,
        ngoadd1: ngoadd1,
        ngoadd2: ngoadd2,
        ngocity: ngocity,
        ngostate: ngostate,
        ngozip: ngozip,
        ngotags: ngotags,
        video: video,
        images: images,
        qrimages: qrimages,
        works: works,
        ngoaccountnumber: ngoaccountnumber,
        ngoifsc: ngoifsc,
        ngobranch: ngobranch,
        ngoprimaryphone: ngoprimaryphone,
        ngosecondaryphone: ngosecondaryphone,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

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

  const handleimagechange = (e) => {
    console.log(e);

    let files = e.target.files;

    let file;
    let list = [];
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      file = files[i];
      reader.onload = (file) => {
        console.log(reader.result);
        var item = reader.result;
        list.push(item);
        console.log(i);
      };
      reader.readAsDataURL(file);
    }
    setImages(list);
  };

  const handleqrimagechange = (e) => {
    let files = e.target.files;

    let file;
    let list = [];
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      file = files[i];
      reader.onload = (file) => {
        console.log(reader.result);
        var item = reader.result;
        list.push(item);
        console.log(i);
      };
      reader.readAsDataURL(file);
    }
    setqrImages(list);
  };

  return (
    <div>
      <div
        style={{
          paddingLeft: "10%",
          paddingRight: "10%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundImage:
            "url('https://wallpaperaccess.com/full/1768590.jpg')",
        }}
      >
        <NgoTags style={{ paddingBottom: "5px" }} />

        <form
          style={{
            padding: "100px",
            paddingBottom: "100px",
            paddingTop: "0px",
            color: "white",
          }}
          onSubmit={(e) => handleRegisterngo(e)}
        >
          <div class="form-row" style={{ marginTop: "0px", paddingTop: "0px" }}>
            <h1
              style={{
                color: "white",
                margin: "auto auto",
                paddingBottom: "10px",
                marginTop: "0px",
              }}
            >
              NGO Details
            </h1>
          </div>

          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="Ngoname">NGO Name</label>
              <input
                onChange={(e) => {
                  setngoname(e.target.value);
                }}
                value={ngoname}
                type="text"
                class="form-control"
                id="Ngoname"
                placeholder="Goonj"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="NgoID">NGO ID</label>
              <input
                onChange={(e) => {
                  setngoid(e.target.value);
                }}
                value={ngoid}
                type="text"
                class="form-control"
                id="NgoID"
                placeholder="AB/2010/0001234"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">Email</label>
              <input
                onChange={(e) => {
                  setngoemail(e.target.value);
                }}
                value={ngoemail}
                type="email"
                class="form-control"
                id="inputEmail4"
                placeholder="Email"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Password</label>
              <input
                onChange={(e) => {
                  setngopassword(e.target.value);
                }}
                value={ngopassword}
                type="password"
                class="form-control"
                id="inputPassword4"
                placeholder="Password To Allow Details Modification"
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputphone1">Primary Contact Number of NGO</label>
              <input
                onChange={(e) => {
                  setngoprimaryphone(e.target.value);
                }}
                value={ngoprimaryphone}
                type="text"
                class="form-control"
                id="inputphone1"
                placeholder="+91-9370097122"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputphone2">Primary Contact Number of NGO</label>
              <input
                onChange={(e) => {
                  setngosecondaryphone(e.target.value);
                }}
                value={ngosecondaryphone}
                type="text"
                class="form-control"
                id="inputphone2"
                placeholder="+91-9370097122"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="inputAddress">Address</label>
            <input
              onChange={(e) => {
                setngoadd1(e.target.value);
              }}
              value={ngoadd1}
              type="text"
              class="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
            />
          </div>
          <div class="form-group">
            <label for="inputAddress2">Address 2</label>
            <input
              onChange={(e) => {
                setngoadd2(e.target.value);
              }}
              value={ngoadd2}
              type="text"
              class="form-control"
              id="inputAddress2"
              placeholder="Apartment, studio, or floor"
            />
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputCity">City</label>
              <input
                onChange={(e) => {
                  setngocity(e.target.value);
                }}
                value={ngocity}
                type="text"
                class="form-control"
                id="inputCity"
                placeholder="Nagpur"
              />
            </div>
            <div class="form-group col-md-4">
              <label for="inputState">State</label>
              <input
                onChange={(e) => {
                  setngostate(e.target.value);
                }}
                value={ngostate}
                type="text"
                id="inputState"
                class="form-control"
                placeholder="Maharashtra"
              />
            </div>
            <div class="form-group col-md-2">
              <label for="inputZip">Zip</label>
              <input
                onChange={(e) => {
                  setngozip(e.target.value);
                }}
                value={ngozip}
                type="text"
                class="form-control"
                id="inputZip"
                placeholder="441107"
              />
            </div>
          </div>
          {/* Bank Details */}
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputaccountnumber">Bank Account Number</label>
              <input
                onChange={(e) => {
                  setngoaccountnumber(e.target.value);
                }}
                value={ngoaccountnumber}
                type="text"
                class="form-control"
                id="inputaccountnumber"
                placeholder="Bank Account where donation can be deposited"
              />
            </div>
            <div class="form-group col-md-4">
              <label for="inputifsc">IFSC Code of Bank</label>
              <input
                onChange={(e) => {
                  setngoifsc(e.target.value);
                }}
                value={ngoifsc}
                type="text"
                id="inputifsc"
                class="form-control"
                placeholder="SBI00001296"
              />
            </div>
            <div class="form-group col-md-2">
              <label for="inputbrach">Bank Branch</label>
              <input
                onChange={(e) => {
                  setngobranch(e.target.value);
                }}
                value={ngobranch}
                type="text"
                class="form-control"
                id="inputbrach"
                placeholder="Saoner"
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-12">
              <label for="NgoTag">NGO Tags (Space Separated)</label>
              <input
                onChange={(e) => {
                  setngotags(e.target.value);
                }}
                value={ngotags}
                type="text"
                class="form-control"
                id="NgoTag"
                placeholder="Children Nature"
              />
            </div>
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
              Add NGO Works
            </button>
          ) : null}

          {works.length
            ? works.map((work, i) => {
                return (
                  <div>
                    <div class="form-row">
                      <div class="form-group col-md-12">
                        <label for="NgoTag">NGO Past Work</label>
                        <textarea
                          onChange={(e) => handleNgoWork(e, i)}
                          value={work}
                          style={{
                            width: "100%",
                          }}
                          class="form-control"
                          id="NgoTag"
                          placeholder="Tree Plantation in kunjvihar to save nature on 26 march 2002, source of proof - https://Goonj.org/tree-plantation-at-kunjvihar"
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
                        Add More NGO Works
                      </button>
                    ) : null}
                  </div>
                );
              })
            : null}

          <div
            class="form-row"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <div class="form-group">
              <label for="exampleFormControlFile1">NGO Images</label>
              <input
                onChange={(e) => handleimagechange(e)}
                style={{
                  cursor: "pointer",
                  width: "100%",
                }}
                multiple
                type="file"
                accept="image/*"
                class="form-control-file"
                id="exampleFormControlFile1"
              />
            </div>

            <div class="form-group">
              <label for="exampleFormControlFile1">
                NGO QR Codes Images For Donation
              </label>
              <input
                onChange={(e) => handleqrimagechange(e)}
                style={{
                  cursor: "pointer",
                  width: "100%",
                }}
                multiple
                type="file"
                accept="image/*"
                class="form-control-file"
                id="exampleFormControlFile1"
              />
            </div>

            <div class="form-group">
              <label for="exampleFormControlFile1">NGO Video</label>
              <input
                onChange={(e) => setVideo(e.target.value)}
                style={{
                  width: "100%",
                }}
                type="text"
                class="form-control-file"
                id="exampleFormControlFile1"
                placeholder="Url for video talking about your NGO"
              />
            </div>
          </div>

          <input
            type="submit"
            style={{
              height: "30px",
              width: "150px",
              alignItems: "center",
              alignContent: "center",
              display: "flex",
              justifyContent: "space-evenly",
              margin: "0 auto",
              marginTop: "20px",
              marginBottom: "20px",
              paddingBottom: "32px",
            }}
            class="btn btn-primary"
            value={"Register"}
          />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterNgo;
