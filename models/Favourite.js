const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    product: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product', 
      required: true 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
  },
  { versionKey: false, timestamps: false }
);

module.exports = mongoose.model('Favourite', favouriteSchema);
