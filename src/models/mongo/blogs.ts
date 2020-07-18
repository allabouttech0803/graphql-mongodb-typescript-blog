import mongoose = require("mongoose");
require('./comments');


const BlogSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    body: String,
    keywords: String,
    url: String,
    adsRequired: Boolean,
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Blog', BlogSchema);
