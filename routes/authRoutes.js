const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const auth = require("../middleware/auth");

//JOI VALIDATORS FOR LOGIN AND REGISTER ROUTES
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(3).max(12).required(),
  mail: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(3).max(12).required(),
  mail: Joi.string().email().required(),
});

//PUBLIC ROUTES
router.post(
  "/register",
  validator.body(registerSchema),
  authControllers.controllers.postRegister
);
router.post(
  "/login",
  validator.body(loginSchema),
  authControllers.controllers.postLogin
);

//PROTECTED ROUTE
router.get("/getdata", auth, (req, res) => {
  try {
    res.send("this is your data!");
  } catch (err) {
    res.error("a jwt token is required for authentication");
  }
});

module.exports = router;
