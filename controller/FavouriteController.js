const Favourite = require("../models/Favourite");
const { handleError } = require("../utils/ErrorHandling");

module.exports.addFavourite = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const existingFavourite = await Favourite.findOne({
      user: userId,
      product: productId,
    });

    if (existingFavourite) {
      await Favourite.findByIdAndDelete(existingFavourite._id);
      return { message: "Removed from favourites" };
    } else {
      const newFavourite = new Favourite({ user: userId, product: productId });
      await newFavourite.save();
      return { message: "Added to favourites", favourite: newFavourite };
    }
  } catch (error) {
    return handleError(error);
  }
};

module.exports.getUserFavourites = async (req, res) => {
    const { userId } = req.query; 
  
    try {

      const favourites = await Favourite.find({ user: userId }).populate('product');
  
      if (!favourites.length) {
        return { message: "No favourites found for this user.",code:400 };
      }
  
      return {
        message: "User's favourites retrieved successfully",
        data:favourites,
      };
    } catch (error) {
      return handleError(error)
    }
  };
  
