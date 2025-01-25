const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const dotenv = require("dotenv");
const path = require('path');
const multer = require('multer');
const db = require("./config/DbConnection");

// Middleware setup
app.use(morgan('dev'));
app.use(express.json());
app.use(cors())
dotenv.config();
db.connect();


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import route files
const Userrouter = require("./routes/UserRoute");
const Productrouter = require("./routes/ProductRoute");
const Categoryrouter = require("./routes/CategoryRoute");
const SubCategoryrouter = require("./routes/SubCategoryRoute");
const Wishlistrouter=require("./routes/WishlistRoute")
const FavouriteRouter=require("./routes/FavouriteRoute")

// Route setup
app.use("/server/user", Userrouter);
app.use("/server/product", Productrouter);
app.use("/server/category", Categoryrouter);
app.use("/server/sub_category", SubCategoryrouter);
app.use("/server/wishlist", Wishlistrouter);
app.use("/server/favourite", FavouriteRouter);


app.use("/", (_, res) =>
    res.status(404).json({ code: 404, message: "page not found" })
  );

const port = process.env.PORT ;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
