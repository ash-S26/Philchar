import React from "react";
import Axios from "axios";

Axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

const Payment = ({ ngoname, amount }) => {
  const paymentHandler = async (e) => {
    // const API_URL = process.env.REACT_APP_BACKEND_URL;
    console.log(ngoname, amount);
    e.preventDefault();
    const orderUrl = `${process.env.REACT_APP_BACKEND_URL}order/${amount}`;
    console.log("orderUrl - ", orderUrl);
    const response = await Axios({
      method: "get",
      url: orderUrl,
    });
    const { data } = response;
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      name: ngoname,
      description: "Thanks for donation",
      order_id: data.id,
      handler: async (response) => {
        try {
          const paymentId = response.razorpay_payment_id;
          const url = `${process.env.REACT_APP_BACKEND_URL}capture/${paymentId}`;
          const captureResponse = await Axios.post(url, { amount: amount });
          console.log(captureResponse.data);
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: "url('https://wallpaperaccess.com/full/1768590.jpg')",
      }}
    >
      <input
        onClick={(e) => paymentHandler(e)}
        style={{
          height: "30px",
          width: "150px",
          alignItems: "center",
          alignContent: "center",
          display: "flex",
          justifyContent: "space-evenly",
          cursor: "pointer",
          margin: "10px",
          marginLeft: "44%",
          marginBottom: "30px",
        }}
        class="btn btn-primary"
        value={"Donate"}
      />
    </div>
  );
};

export default Payment;
