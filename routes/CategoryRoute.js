const express = require("express");
const router = express.Router();
const Response = require("../utils/Response");
const authenticateToken = require("../utils/MiddleWares/TokenMiddleware");
const { addCategory, getCategories } = require("../controller/CategoryController");

router
  .route("/")
.post(async(req,res)=> {
    const data = await addCategory(req, res);
    Response(res, data);
  })
  .get(async(req,res)=> {
    const data = await getCategories(req, res);
    Response(res, data);
  })

module.exports = router;
