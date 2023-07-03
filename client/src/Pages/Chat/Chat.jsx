import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const Chat = () => {
  const [search, setSearch] = useState("");
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState(undefined);
  const [isloading, setIsLoading] = useState(false);
  const [allchats, setallchats] = useState([]);
  const [selectedngodetails, setselectedngosdetails] = useState("");
  const [selectedngochats, setselectedngochats] = useState([]);
  const [searchallchats, setsearchallchats] = useState([]);
  const [disabled, setdisabled] = useState(false);

  const [arrivalmsg, setarrivalmsg] = useState("");

  const navigate = useNavigate();

  const socket = useRef();

  const scrollRef = useRef();

  //   console.log("params - ", id);
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/auth");
    if (localStorage.getItem("token")) {
      console.log("Initialize socket");
      socket.current = io(`${process.env.REACT_APP_CHAT_HOST}`);
      socket.current.emit("add-user", id);
      console.log(socket.current);
    }
  }, []);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}messagesend`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          to: selected,
          message: message,
        }),
      }
    );
    const { data } = await response.json();
    if (data.code == 200) {
      navigate("/auth");
    }
    if (data.status == 200) {
      setselectedngochats([
        ...selectedngochats,
        {
          sender: id,
          text: message,
          fromself: true,
          _id: Math.round(Math.random() * 10000000),
        },
      ]);
      socket.current.emit("send-msg", {
        to: selected,
        from: id,
        message: message,
      });
    } else {
      console.log("Failed to post message");
    }

    setMessage("");
  };

  const handleSearch = (e) => {
    setdisabled(true);
    setSearch(e.target.value);
    console.log(e.target.value);
    e.preventDefault();
    if (e.target.value.length == 0) setsearchallchats(allchats);
    else {
      const searcharray = allchats.filter((str) => {
        if (str.ngoname)
          return str.ngoname.toLowerCase().includes(e.target.value);
        else return str.name.toLowerCase().includes(e.target.value);
      });
      console.log(searcharray);
      setsearchallchats(searcharray);
    }
    setdisabled(false);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/auth");
    if (!localStorage.getItem("token")) {
      navigate("/auth");
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/auth");
    else if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setarrivalmsg({
          fromself: false,
          text: msg,
          sender: selected,
          _id: Math.round(Math.random() * 1000000000),
        });
      });
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/auth");
    arrivalmsg && setselectedngochats((prev) => [...prev, arrivalmsg]);
    // console.log("After arrival message : ", selectedngochats);
  }, [arrivalmsg]);

  useEffect(() => {
    async function getallchats() {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}listallchatngos`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      const { data } = await response.json();
      if (data.code == 200) {
        navigate("/auth");
      }
      setallchats(data.allchats);
      setsearchallchats(data.allchats);
    }
    if (localStorage.getItem("token")) {
      setIsLoading(true);
      getallchats();
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/auth");
    console.log("Inside Selected useeffect");
    async function getngodetailsforchat() {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}getngodetailsforchat`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            id: selected,
            user: id,
          }),
        }
      );

      const { data } = await response.json();
      if (data.code == 200) {
        navigate("/auth");
      }
      setselectedngosdetails(data.ngodetails);
    }
    async function getngochats() {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}getallchatsforngos`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            to: selected,
          }),
        }
      );

      const { data } = await response.json();
      if (data.code == 200) {
        navigate("/auth");
      }
      setselectedngochats(data.chats);
    }
    if (selected) {
      setIsLoading(true);
      getngodetailsforchat();
      getngochats();
      setIsLoading(false);
      console.log("chats :- ", selectedngochats);
    }
  }, [selected]);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/auth");
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [selectedngochats]);

  if (isloading) {
    return (
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return localStorage.getItem("token") != null ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          border: "solid",
          borderWidth: "5px",
          borderRadius: "10px",
          borderColor: "ButtonShadow",
          width: "80%",
        }}
      >
        <div
          style={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            alignSelf: "flex-start",
          }}
        >
          <div
            style={{
              padding: "5px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex" }}>
              <input
                onChange={handleSearch}
                disabled={disabled}
                style={{
                  width: "82%",
                  display: "flex",
                  borderRadius: "5px",
                  color: "black",
                  borderColor: "rgb(255, 87, 34)",
                  borderWidth: "5px",
                }}
                placeholder="Search"
                name="search"
                value={search}
              />
            </div>
          </div>

          <div
            style={{
              height: "75vh",
              display: "flex",
              overflow: "auto",
              flexDirection: "column",
            }}
          >
            {searchallchats
              ? searchallchats.map((chat) => {
                  return (
                    <div
                      style={{
                        backgroundColor: "white",
                        width: "80%",
                        display: "flex",
                        justifyContent: "space-between",
                        borderRadius: "5px",
                        color: "black",
                        marginTop: "20px",
                        marginLeft: "5px",

                        backgroundColor: "rgb(255, 87, 34)",
                      }}
                      key={chat._id}
                      onClick={() => {
                        setSelected(chat._id);
                      }}
                    >
                      <div
                        style={{
                          color: "white",
                          fontWeight: "1000",
                          fontSize: "20px",

                          paddingLeft: "5px",
                          paddingRight: "5px",
                        }}
                      >
                        {chat.ngoname == undefined ? chat.name : chat.ngoname}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignSelf: "flex-end",
                          backgroundColor: "rgba(255, 54, 54, 0.5)",
                          float: "right",
                        }}
                      >
                        {chat.ngotags != undefined
                          ? chat.ngotags.map((tag) => {
                              return (
                                <div
                                  style={{
                                    color: "white",
                                    fontWeight: "500",
                                    padding: "5px",
                                  }}
                                >
                                  {tag}
                                </div>
                              );
                            })
                          : null}
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "60%",
            // backgroundColor: "blue",
            borderRadius: "10px",
            paddingLeft: "20px",
          }}
        >
          {selected ? (
            <>
              <div
                style={{
                  height: "5vh",
                  display: "flex",
                  color: "white",
                  display: "flex",
                  paddingLeft: "10px",
                  marginTop: "20px",
                  fontWeight: "1000",
                  fontSize: "30px",
                  alignItems: "center",
                }}
              >
                {selectedngodetails.ngoname != undefined
                  ? selectedngodetails.ngoname
                  : selectedngodetails.name}
              </div>
              <hr style={{ width: "100%", color: "black", height: "5px" }} />
              <div
                style={{
                  height: "60vh",
                  display: "flex",
                  overflow: "auto",
                  flexDirection: "column",
                }}
              >
                {selectedngochats.map((msg) => {
                  return msg.fromself ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                      key={uuidv4()}
                      ref={scrollRef}
                    >
                      <div
                        style={{
                          backgroundColor: "#13cf13",
                          margin: "5px",
                          padding: "5px",
                          wordBreak: "break-word",
                          color: "white",
                          borderRadius: "8px",
                          maxWidth: "70%",
                        }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                      key={msg._id}
                    >
                      <div
                        style={{
                          backgroundColor: "#44bec7",
                          margin: "5px",
                          padding: "5px",
                          color: "white",
                          wordBreak: "break-word",
                          borderRadius: "8px",
                          maxWidth: "70%",
                        }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ height: "5vh", marginTop: "10px" }}>
                <form onSubmit={handleMessageSubmit}>
                  <input
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    placeholder="Your message here"
                    name="message"
                    value={message}
                    style={{
                      width: "85%",
                      borderRadius: "5px",
                      color: "black",
                      fontWeight: "800",
                      padding: "5px",
                    }}
                  />
                  <button
                    style={{
                      padding: "7px",
                      borderRadius: "5px",
                      color: "black",
                    }}
                    type="submit"
                  >
                    {" "}
                    send{" "}
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignSelf: "center",
                flexDirection: "column",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <img
                    style={{ height: "50%", width: "50%" }}
                    src="https://github.com/koolkishan/chat-app-react-nodejs/blob/master/public/src/assets/robot.gif?raw=true"
                  ></img>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <div>Connect to community</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default Chat;
