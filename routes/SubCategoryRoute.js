const express = require("express");
const router = express.Router();
const Response = require("../utils/Response");
const authenticateToken = require("../utils/MiddleWares/TokenMiddleware");
const { addSubCategory, getSubCategory } = require("../controller/SubCategoryController");

router
.route("/")
.post(async(req,res)=> {
    const data = await addSubCategory(req, res);
    Response(res, data);
  })
  .get(async(req,res)=> {
    const data = await getSubCategory(req, res);
    Response(res, data);
  })

module.exports = router;
