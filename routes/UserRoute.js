const express = require("express");
const router = express.Router();
const Response = require("../utils/Response");
const { signUp, logIn } = require("../controller/UserController");

router
  .route("/signup")
  .post(async (req, res) => {
    const data = await signUp(req, res);
    Response(res, data);
  })

  router
 .route("/login")
  .post(async (req, res) => {
    const data = await logIn(req, res);
    Response(res, data);
  })

module.exports = router;
