const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  ram: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
}, { _id: false }); 

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true },
    variants: [variantSchema],  
    description: { type: String, required: true },
    image: [{ type: String }],
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
