const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');
const { handleError } = require('../utils/ErrorHandling');

module.exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user; 

    const product = await Product.findById(productId);
    if (!product) {
      return { message: 'Product not found', code:400 };
    }
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = await Wishlist.create({ userId, products: [productId] });
    } else {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
      } else {
        return { message: 'Product already in wishlist',code:400 };
      }
    }

    await wishlist.save();
    return { message: 'Product added to wishlist', data:wishlist };
  } catch (error) {
    return handleError(error)
  }
};


module.exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user;

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return { message: 'Wishlist not found',code:400};
    }

    wishlist.products = wishlist.products.filter(
      (product) => product.toString() !== productId
    );

    if (wishlist.products.length === 0) {
        await Wishlist.deleteOne({ userId });
      }

    await wishlist.save();
    return { message: 'Product removed from wishlist', data:wishlist };
  } catch (error) {
    return handleError(error)
  }
};


module.exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user;

    const wishlist = await Wishlist.findOne({ userId }).populate('products');

    if (!wishlist) {
      return { message: 'Wishlist not found',code:400 };
    }

    return{ data:wishlist };
  } catch (error) {
    return handleError(error)
  }
};
