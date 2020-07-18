import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../../models/context';
import { IResolvers } from 'graphql-tools';
import * as jwt from 'jsonwebtoken';
import { BlogsController } from '../../controllers/blogs.controller';
import { CommentsController } from '../../controllers/comments.controller';
import { AppConstants } from '../../constants/app.constants';
import { UsersController } from '../../controllers/users.controller';

const blogController = new BlogsController();
const commentsController = new CommentsController();
const usersController = new UsersController();

const resolvers: IResolvers = {
  Query: {
    blog: (_: void, args: any, ctx: Context, _info: GraphQLResolveInfo) => {
      return blogController.getBlog(args, ctx);
    },
    blogs: (_: void, args: any, ctx: Context, _info: GraphQLResolveInfo) => {
      return blogController.getBlogs(args, ctx);
    },
    token: (_, args: any) => {
      return jwt.sign({ data: args[AppConstants.EMAIL] }, <string>process.env.auth_encryption_salt);
    },
  },

  Mutation: {
    addBlog: (_, inputObject, ctx: Context) => {
      return blogController.addBlog(inputObject, ctx);
    },
    updateBlog: (_, inputObject, ctx: Context) => {
      return blogController.updateBlog(inputObject, ctx);
    },
    deleteBlog: (_, inputObject, ctx: Context) => {
      return blogController.deleteBlog(inputObject, ctx);
    },
    addComment: (_, inputObject, ctx: Context) => {
      return commentsController.addComment(inputObject, ctx);
    },
    updateComment: (_, inputObject, ctx: Context) => {
      return commentsController.updateComment(inputObject, ctx);
    },
    deleteComment: (_, inputObject, ctx: Context) => {
      return commentsController.deleteComment(inputObject, ctx);
    },
    addUser: (_, inputObject, ctx: Context) => {
      return usersController.addUser(inputObject, ctx);
    },
    updateUser: (_, inputObject, ctx: Context) => {
      return usersController.updateUser(inputObject, ctx);
    },
  },
};

export default resolvers;
