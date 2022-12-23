/* eslint-disable no-undef */
const { Router } = require("express");
const users = require("../models/users");
const authRouter = Router();
const verifyAuth = require("../middleware/verifyAuth");
const { encrypt, compare, createAccessToken } = require("../utils");
const sendMail = require("../config/mailer");

authRouter.post("/login", (req, res) => {
  return Promise.resolve()
    .then(() => {
      if (!(req.body.email && req.body.password)) {
        throw Error("email or password is not found");
      }
      return users.findOne({ email: req.body.email });
    })
    .then((data) => {
      if (!data) {
        throw Error("User not found");
      }
      return compare(req.body.password, data.password);
    })
    .then((match) => {
      if (!match) {
        throw Error("invalid password");
      }
      return res.status(200).json({
        message: "login successful",
        access_token: createAccessToken(req.body.email),
      });
    })
    .catch((error) => {
      return res.status(422).json({
        message: "login failed",
        error: error.message,
      });
    });
});

authRouter.post("/register", (req, res) => {
  let resData
  return Promise.resolve()
    .then(() => {
      if (!(req.body.email && req.body.userName && req.body.password)) {
        throw Error("email, userName or password is not found");
      }
      return encrypt(req.body.password);
    })
    .then((hash) => {
      req.body.password = hash;
      return users.create(req.body);
    })
    .then((data) => {
      resData = data.toJSON();
      delete resData.password;

      resData.access_token = createAccessToken(req.body.email);
      
      return sendMail(resData.email, resData.userName, resData.otp)

    })
    .then(() => {
      delete resData.otp
      return res.status(200).json({
      message: "registered successful",
      data: resData,
    });
  })
  
    .catch((error) => {
      return res.status(422).json({
        message: "register failed",
        error: error.message,
      });
    });
});
authRouter.post("/verify", verifyAuth, (req, res) => {
  return users
    .findOne({ email: req.email }, { otp: 1 })
    .then((data) => {
      if (data.otp !== req.body.otp) {
        throw Error("invalid otp");
      }
      return users.findOneAndUpdate(
        { email: req.email },
        { $set: { verified: true } }
      );
    })
    .then((data) => {
      return res.status(200).json({
        message: "email verified successful",
        data: data,
      });
    })
    .catch((error) => {
      return res.status(422).json({
        message: "email not verified",
        error: error.message,
      });
    });
});

module.exports = authRouter;
