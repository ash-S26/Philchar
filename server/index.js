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
  console.log(req.body);
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
  console.log(req.body);
  let { name, phone, email, password, tags, vision, works } = req.body;

  let phils = await Phil.findOne({ email: email });
  if (phils == null) {
    phils = await Ngo.findOne({ ngoemail: email });
  }
  console.log(phils, email);

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
  console.log(req.body);
  let { email, password } = req.body;

  let user = await Ngo.findOne({ email: email });
  console.log("After ngo - ", user);
  if (user) {
    if (user.password == password) {
      payload = {
        name: user.ngoname,
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
  console.log(req.body);
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

app.get("/ngo/:id", auth, async (req, res) => {
  console.log(req.user, req.userID);
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
  console.log("payment");
  console.log(req.params);

  res.status(200).json({
    message: "Okkk",
  });
});

app.get("/userprof", auth, (req, res) => {
  console.log(req);
  res.json({ code: 200, data: { id: req.userID } });
});

////////////////////////////////////////////////////////////////////////////////
const port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log("Server started on port 5000.");
});
