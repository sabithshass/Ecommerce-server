const express = require("express");
const router = express.Router();
const Response = require("../utils/Response");
const { addFavourite, getUserFavourites } = require("../controller/FavouriteController");



router
  .route("/")

.post(async(req,res)=> {
    const data = await addFavourite(req, res);
    Response(res, data);
  })

  .get(async(req,res)=> {
    const data = await getUserFavourites(req, res);
    Response(res, data);
  })


module.exports = router;
