import { VerifyAuthorization } from '../decorators/auth.decorator';
import { Context } from '../models/context';
import * as jwt from 'jsonwebtoken';
const Comments = require('../models/comments');
const Blogs = require('../models/blogs');
const Users = require('../models/users');

export class CommentsController {
  @VerifyAuthorization
  async addComment(inputObject: any, _ctx: Context) {
    const userMongoId = await Users.findOne({ email: _ctx.email }).then((userObject: any) => {
      return userObject._id;
    });

    return Comments.create({ comment: inputObject.commentDescription, user: userMongoId })
      .then((commentInfo: any) => {
        return Blogs.findOneAndUpdate(
          {
            url: inputObject.blogUrl,
          },
          { $push: { comments: commentInfo._id } },
          { new: true }
        ).populate({
          path: 'comments',
          model: 'Comment',
          populate: {
            path: 'user',
            model: 'User',
          },
        });
      })
      .catch((err: any) => {
        throw err;
      });
  }

  @VerifyAuthorization
  updateComment(inputObject: any, _ctx: Context) {
    return Comments.findOneAndUpdate({ _id: inputObject.id }, inputObject.input, { new: true }).then(
      (blogInfo: any) => {
        return blogInfo;
      }
    );
  }

  @VerifyAuthorization
  deleteComment(inputObject: any, _ctx: Context) {
    return Comments.findOneAndDelete({ _id: inputObject.id }).then((blogInfo: any) => {
      return blogInfo;
    });
  }
}
