const express = require("express");
const router = express.Router();
const Response = require("../utils/Response");
const authenticateToken = require("../utils/MiddleWares/TokenMiddleware");
const { addToWishlist, removeFromWishlist, getWishlist } = require("../controller/WishlistController");

router
  .route("/")

.post(authenticateToken,async(req,res)=> {
    const data = await addToWishlist(req, res);
    Response(res, data);
  })

  .put(authenticateToken,async(req,res)=> {
    const data = await removeFromWishlist(req, res);
    Response(res, data);
  })

  .get(authenticateToken,async(req,res)=> {
    const data = await getWishlist(req, res);
    Response(res, data);
  })


module.exports = router;
