import { Context } from '../models/context';
import { VerifyAuthorization } from '../decorators/auth.decorator';

const Blogs = require('../models/blogs');

export class BlogsController {
  @VerifyAuthorization
  getBlog(args: any, ctx: Context) {
    return Blogs.find({ url: args['url'] })
      .populate({
        path: 'comments',
        model: 'Comment',
        populate: {
          path: 'user',
          model: 'User',
        },
      })
      .then((blogs: any) => {
        return blogs[0];
      });
  }

  @VerifyAuthorization
  getBlogs(args: any, ctx: any) {
    return Blogs.find()
      .populate({
        path: 'comments',
        model: 'Comment',
        populate: {
          path: 'user',
          model: 'User',
        },
      })
      .then((blogs: any) => {
        return blogs;
      });
  }

  @VerifyAuthorization
  addBlog(inputObject: any, ctx: any) {
    return Blogs.create(inputObject.input).then((blogInfo: any) => {
      return blogInfo;
    });
  }

  @VerifyAuthorization
  updateBlog(inputObject: any, ctx: any) {
    return Blogs.findOneAndUpdate({ _id: inputObject.id }, inputObject.input, { new: true }).then(
      (blogInfo: any) => {
        return blogInfo;
      }
    );
  }

  @VerifyAuthorization
  deleteBlog(inputObject: any, ctx: any) {
    return Blogs.findOneAndDelete({ _id: inputObject.id }).then((blogInfo: any) => {
      return blogInfo;
    });
  }
}
