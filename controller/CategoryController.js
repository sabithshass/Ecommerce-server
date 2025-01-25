const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const { handleError } = require('../utils/ErrorHandling');

module.exports.addCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    return {data:category,message:"category created successfully"};
  } catch (error) {
    return handleError(error)
  }
};



module.exports.getCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalCategories = await Category.countDocuments();


    const categories = await Category.find()
      .skip(skip)
      .limit(limit)
      .lean() 
      .exec();

    for (let category of categories) {
      category.subCategories = await SubCategory.find({ category: category._id });
    }

    const totalPages = Math.ceil(totalCategories / limit);
    const hasNext = page < totalPages;
    const hasPrevious = page > 1;

    return {
      data: {
        categories,
        totalItems: totalCategories,
        totalPages,
        currentPage: page,
        hasNext,
        hasPrevious
      },
      message: "Categories fetched successfully"
    };
  } catch (error) {
    return handleError(error)
  }
};
