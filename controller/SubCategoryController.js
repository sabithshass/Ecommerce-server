const SubCategory = require('../models/SubCategory');
const { handleError } = require('../utils/ErrorHandling');

module.exports.addSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.create(req.body);
    return{data:subCategory ,message:"sub category created successfully"};
  } catch (error) {
   return handleError(error)
  }
};


module.exports.getSubCategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalSubCategories = await SubCategory.countDocuments();
    const sub_categories = await SubCategory.find()
      .skip(skip)
      .limit(limit)
      .populate('category');

    const totalPages = Math.ceil(totalSubCategories / limit);
    const hasNext = page < totalPages;
    const hasPrevious = page > 1;

    return {
      data: {
        sub_categories,
        totalItems: totalSubCategories,
        totalPages,
        currentPage: page,
        hasNext,
        hasPrevious
      },
      message: "Subcategories fetched successfully"
    };
  } catch (error) {
    return handleError(error)
  }
};
