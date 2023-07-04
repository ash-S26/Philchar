require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const cors = require("cors");
const multer = require("multer");
var path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("./middleware/auth");
const socket = require("socket.io");
const Messages = require("./models/message");
const Donation = require("./models/donation");
/////////////////////////////////////////

const JWT_SECRET = "secret";

const Ngodata = mongoose.Schema({
  ngoname: { type: String, required: true },
  ngoprimaryphone: { type: String, required: true },
  ngosecondaryphone: { type: String, required: true },
  ngoaccountnumber: { type: String, required: true },
  ngoifsc: { type: String, required: true },
  ngobranch: { type: String, required: true },
  ngoid: { type: String, required: true },
  ngoemail: { type: String, required: true },
  ngopassword: { type: String, required: true },
  ngoadd1: { type: String, required: true },
  ngoadd2: { type: String, default: "" },
  ngocity: { type: String, required: true },
  ngostate: { type: String, default: "" },
  ngozip: { type: String, required: true },
  ngotags: { type: [String], required: true },
  video: { type: String, default: "" },
  images: { type: [String], required: true },
  qrimages: { type: [String], required: true },
  works: { type: [String], default: [] },
});

const Ngo = mongoose.model("Ngo", Ngodata);

const Phildata = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  tags: { type: [String], required: true },
  works: { type: [String], required: true },
  vision: { type: String, required: true },
  donated: { type: Number, default: 0 },
});

const Phil = mongoose.model("Philantropist", Phildata);
//////////////////////////////////////////

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const KEY_ID = process.env.RAZORPAY_KEY;
const KEY_SECRET = process.env.KEY_SECRET;

const Razorpay = require("razorpay");
const { log } = require("console");
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

connectDB();

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var upload_img = multer({ storage: storage });

app.get("/", function (req, res) {
  res.send("Sever");
});

app.post("/registerngo", (req, res) => {
  //   console.log(req.files, 5);
  const taglist = req.body.ngotags.split(" ");
  let result = Ngo.create({
    ngoname: req.body.ngoname,
    ngoid: req.body.ngoid,
    ngoemail: req.body.ngoemail,
    ngopassword: req.body.ngopassword,
    ngoadd1: req.body.ngoadd1,
    ngoadd2: req.body.ngoadd2,
    ngocity: req.body.ngocity,
    ngostate: req.body.ngostate,
    ngozip: req.body.ngozip,
    ngotags: taglist,
    works: req.body.works,
    images: req.body.images,
    qrimages: req.body.qrimages,
    video: req.body.video,
    ngosecondaryphone: req.body.ngosecondaryphone,
    ngoprimaryphone: req.body.ngoprimaryphone,
    ngoaccountnumber: req.body.ngoaccountnumber,
    ngoifsc: req.body.ngoifsc,
    ngobranch: req.body.ngobranch,
  });
  if (result) {
    res.send({ code: 200, message: "Upload Success" });
  } else {
    res.send({ code: 500, message: "Upload Err" });
  }
});

app.post("/phil/signup", async (req, res) => {
  let { name, phone, email, password, tags, vision, works } = req.body;

  let phils = await Phil.findOne({ email: email });
  if (phils == null) {
    phils = await Ngo.findOne({ ngoemail: email });
  }

  if (phils == null) {
    const taglist = req.body.tags.split(" ");
    let result = await Phil.create({
      name: name,
      email: email,
      password: password,
      phone: phone,
      vision: vision,
      tags: taglist,
      works: works,
    });
    if (result) {
      res.status(200).json({
        message: "User Registered",
        data: {
          info: req.body,
        },
      });
    } else {
      res.status(200).json({
        data: "Error user creation",
      });
    }
  } else {
    res.status(200).json({
      data: "User Already exists",
    });
  }
});

app.post("/signin", async (req, res) => {
  let { email, password } = req.body;

  let user = await Ngo.findOne({ ngoemail: email });
  // console.log("After ngo - ", user);
  if (user) {
    if (user.ngopassword == password) {
      payload = {
        name: user.ngoname,
        type: "ngo",
        id: user._id,
      };

      jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
        if (err) throw err;
        res.json({ token: token, email: email });
      });
    } else {
      res.json({
        message: "Invalid Cred",
        data: {
          email: email,
        },
      });
    }
  } else {
    user = await Phil.findOne({ email: email });
    if (user) {
      if (user.password == password) {
        payload = {
          name: user.name,
          type: "phil",
          id: user._id,
        };

        jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
          if (err) throw err;
          res.json({ token: token, email: email });
        });
      } else {
        res.json({
          message: "Invalid Cred",
          data: {
            email: email,
          },
        });
      }
    } else {
      res.json({
        message: "User does not exist",
        data: {
          info: "User not exist",
        },
      });
    }
  }
});

app.get("/allngos", auth, async (req, res) => {
  let ngos = await Ngo.find({});
  if (ngos.length >= 0) {
    res.json({ code: 200, data: ngos });
  } else {
    res.json({ code: 500, message: "Server Err" });
  }
});

app.post("/ngo/name", auth, async (req, res) => {
  let ngos = await Ngo.find({
    ngoname: { $regex: req.body.ngoname },
  });
  if (ngos.length >= 0) {
    res.send({ code: 200, data: ngos });
  } else {
    res.send({ code: 500, message: "Server Err" });
  }
});

app.post("/ngo/tag", auth, async (req, res) => {
  console.log(req.body);
  list = req.body.ngotags.split(" ");
  let ngos = [];
  for (let x in list) {
    console.log(x);
    let ngo = await Ngo.find({ ngotags: { $regex: list[x] } });
    console.log(ngo.length);
    ngo.map((item) => {
      var flag = 1;
      ngos.map((name) => {
        if (name.ngoname == item.ngoname) flag = 0;
      });
      if (flag) ngos.push(item);
    });
  }

  if (ngos.length >= 0) {
    res.send({ code: 200, data: ngos });
  } else {
    res.send({ code: 500, message: "Server Err" });
  }
});

// total ngos, phils, donation, states
app.get("/homepagedata", async (req, res) => {
  const totalphils = await Phil.estimatedDocumentCount();
  const totalngos = await Ngo.estimatedDocumentCount();
  const totalstate = await Ngo.distinct("ngostate");
  let totaldonation = 0;
  const temp = await Donation.aggregate([
    {
      $group: {
        _id: null,
        totaldonation: { $sum: "$amount" },
      },
    },
  ]);

  totaldonation = temp[0].totaldonation;
  res.json({
    data: {
      details: {
        totalphils: totalphils,
        totalngos: totalngos,
        totalstate: totalstate.length,
        totaldonation: totaldonation,
      },
      status: 200,
    },
  });
  // console.log(totalphils, totalngos, totalstate, totaldonation);
});

app.get("/ngo/:id", auth, async (req, res) => {
  let ngo = await Ngo.findOne({ _id: req.params.id });
  // console.log(ngo);
  if (ngo) {
    res.send({ code: 200, data: ngo });
  } else {
    res.send({ code: 500, message: "Server Err" });
  }
});

// app.post("/signin", async (req, res) => {
//   console.log(req.body);
//   let ngo = await Ngo.findOne({ email: req.body.email });
//   console.log(ngo);

//   if (ngo) {
//     res.send({ code: 200, data: ngo });
//   } else {
//     res.send({ code: 500, message: "Server Err" });
//   }
// });

app.get("/order/:amount", auth, (req, res) => {
  amount = req.params.amount;
  var amount = req.params.amount * 100;
  try {
    const options = {
      amount: amount, // amount == Rs 10
      currency: "INR",
      receipt: "receipt#1",
      payment_capture: 1,
      // 1 for automatic capture // 0 for manual capture
    };
    instance.orders.create(options, async function (err, order) {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong",
        });
      }
      return res.status(200).json(order);
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
});

app.post("/capture/:paymentId", auth, async (req, res) => {
  console.log("payment sucess");
  const { amount, donor, to } = req.body;
  const donated = await Donation.create({
    amount: amount,
    donor: donor,
    to: to,
    users: [donor, to],
  });

  // console.log(donated);
  if (donated)
    res.json({ data: { status: 200, message: "Donated Successfully" } });
  else
    res.json({
      data: { status: 400, message: "Error Occourded while donating" },
    });
});

app.get("/userprof", auth, (req, res) => {
  res.json({ code: 200, data: { id: req.userID } });
});

app.post("/userprof", auth, async (req, res) => {
  let success = false;
  let {
    ngoemail,
    ngopassword,
    ngoadd1,
    ngoadd2,
    ngocity,
    ngostate,
    ngozip,
    ngotags,
    videos,
    images,
    qrimages,
    works,
    ngoaccountnumber,
    ngoifsc,
    ngobranch,
    ngoprimaryphone,
    ngosecondaryphone,
    email,
    password,
    phone,
  } = req.body;
  payload = {};
  let item = await Ngo.findById({ _id: req.userID });
  if (item != null) {
    if (ngoemail.length > 0) {
      payload["ngoemail"] = ngoemail;
    }
    if (ngopassword.length > 0) {
      payload["ngopassword"] = ngopassword;
    }
    if (ngoadd1.length > 0) {
      payload["ngoadd1"] = ngoadd1;
    }
    if (ngoadd2.length > 0) {
      payload["ngoadd2"] = ngoadd2;
    }
    if (ngocity.length > 0) {
      payload["ngocity"] = ngocity;
    }
    if (ngostate.length > 0) {
      payload["ngostate"] = ngostate;
    }
    if (ngozip.length > 0) {
      payload["ngozip"] = ngozip;
    }
    if (ngotags.length > 0) {
      let tags = item.ngotags;
      for (x in ngotags) {
        let found = 1;
        for (y in tags) {
          if (x == y) found = 0;
        }
        if (found) tags.push(x);
      }
      payload["ngotags"] = tags;
    }
    if (video.length > 0) {
      payload["video"] = video;
    }
    if (images.length > 0) {
      payload["images"] = images;
    }
    if (qrimages.length > 0) {
      payload["qrimages"] = qrimages;
    }
    if (works.length > 0) {
      new_works = item.works;
      for (work in works) new_works.push(work);
      payload["works"] = new_works;
    }
    if (ngoaccountnumber.length > 0) {
      payload["ngoaccountnumber"] = ngoaccountnumber;
    }
    if (ngoifsc.length > 0) {
      payload["ngoifsc"] = ngoifsc;
    }
    if (ngobranch.length > 0) {
      payload["ngobranch"] = ngobranch;
    }
    if (ngoprimaryphone.length > 0) {
      payload["ngoprimaryphone"] = ngoprimaryphone;
    }
    if (ngosecondaryphone.length > 0) {
      payload["ngosecondaryphone"] = ngosecondaryphone;
    }

    let updated = await Ngo.findOneAndUpdate(
      { _id: req.userID },
      { $set: payload }
    );
    if (updated != null) {
      success = true;
    }
  } else {
    item = await Phil.findById({ _id: req.userID });
    if (item) {
      if (email.length > 0) {
        payload["email"] = email;
      }
      if (phone.length > 0) {
        payload["phone"] = phone;
      }
      if (password.length > 0) {
        payload["password"] = password;
      }
      if (works.length > 0) {
        new_works = item.works;
        for (work in works) {
          console.log(works[work]);
          new_works.push(works[work]);
        }
        payload["works"] = new_works;
      }
      if (ngotags.length > 0) {
        ngotags = ngotags.split(" ");
        let tags = item.tags;
        for (x in ngotags) {
          let found = 1;
          for (y in tags) {
            if (ngotags[x] == tags[y]) found = 0;
          }
          if (found) tags.push(ngotags[x]);
        }
        payload["tags"] = tags;
      }
      // console.log(payload);
      updated = await Phil.findOneAndUpdate(
        { _id: req.userID },
        { $set: payload },
        { new: true }
      );
      if (updated != null) {
        success = true;
      }
    }
  }
  if (success)
    res.json({ code: 200, data: { id: req.userID, updated: updated } });
  else res.json({ code: 409, data: { error: "some error occured" } });
});

app.get("/listallchatngos", auth, async (req, res) => {
  let allchats = await Ngo.find({ _id: { $ne: req.userID } }).select({
    ngoname: 1,
    _id: 1,
    ngotags: 1,
  });

  const philchats = await Phil.find({ _id: { $ne: req.userID } }).select({
    name: 1,
    _id: 1,
  });

  allchats = [...allchats, ...philchats];
  console.log(allchats);
  res.json({
    data: { message: "Got request", allchats: allchats },
  });
});

app.post("/getngodetailsforchat", auth, async (req, res) => {
  let details = await Ngo.findById(req.body.id).select({
    ngoname: 1,
    ngoprimaryphone: 1,
    ngocity: 1,
    ngostate: 1,
  });

  if (details == null) {
    details = await Phil.findById(req.body.id).select({
      name: 1,
    });
  }

  res.send({ data: { status: 200, ngodetails: details } });
});

app.post("/messagesend", auth, async (req, res) => {
  const newmsg = Messages.create({
    text: req.body.message,
    users: [req.userID, req.body.to],
    sender: req.userID,
  });

  if (newmsg) {
    res.json({ data: { status: 200, newmsg: newmsg } });
  } else {
    res.json({ data: { status: 500, newmsg: "error occoured" } });
  }
});

app.post("/getallchatsforngos", auth, async (req, res) => {
  const chats = await Messages.find({
    users: { $all: [req.body.to, req.userID] },
  }).sort({ updatedAt: 1 });

  const modifiedmsg = chats.map((msg) => {
    return {
      _id: msg._id,
      text: msg.text,
      sender: msg.sender,
      fromself: msg.sender == req.userID,
    };
  });
  // console.log("chats : ", modifiedmsg);
  res.send({ data: { chats: modifiedmsg } });
});

////////////////////////////////////////////////////////////////////////////////
const port = process.env.PORT || 5000;

const server = app.listen(port, function () {
  console.log("Server started on port 5000.");
});

const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("socket - ", socket);
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    console.log("send msg triggered");
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
