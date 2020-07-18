import mongoose = require('mongoose');
require('./comments');

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    body: { type: String, required: true },
    keywords: String,
    url: {
      type: String,
      required: true,
      index: { unique: true },
    },
    adsRequired: Boolean,
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Blog', BlogSchema);
