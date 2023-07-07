import React from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

const Payment = ({ ngoname, amount, sender, ngoid }) => {
  const paymentHandler = async (e) => {
    // const API_URL = process.env.REACT_APP_BACKEND_URL;

    e.preventDefault();
    if (amount.length == 0) {
      toast.error("Please enter a valid amount.", {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }
    const orderUrl = `${process.env.REACT_APP_BACKEND_URL}order/${amount}`;
    console.log("orderUrl - ", orderUrl);
    const response = await fetch(orderUrl, {
      method: "GET",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    // const response = await Axios({
    //   method: "get",
    //   url: orderUrl,
    // });
    const data = await response.json();
    console.log(data);
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      name: ngoname,
      description: "Thanks for donation",
      order_id: data.id,
      handler: async (response) => {
        try {
          const paymentId = response.razorpay_payment_id;
          const url = `${process.env.REACT_APP_BACKEND_URL}capture/${paymentId}`;
          const captureResponse = await Axios.post(url, {
            amount: amount,
            donor: sender,
            to: ngoid,
          });
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
    <div>
      <button
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
      >
        Donate
      </button>
      <ToastContainer />
    </div>
  );
};

export default Payment;
