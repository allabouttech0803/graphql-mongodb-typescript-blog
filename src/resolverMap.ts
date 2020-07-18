import { GraphQLResolveInfo, GraphQLError } from 'graphql';
import { Context } from './models';
import { IResolvers } from 'graphql-tools';
const Blogs = require("./models/mongo/blogs");
require("./models/mongo/comments");
require("./models/mongo/users");

const resolverMap: IResolvers = {
  Query: {
    async blogs(_: void, args: any, ctx: Context, info: GraphQLResolveInfo) {
      if (!ctx.isUserLogged) {
        throw new GraphQLError('You are not authorized !!');
      }
      return await Blogs.find({ title: args['title'] })
        .populate({
          path: 'comments',
          model: 'Comment',
          populate: {
            path: 'user',
            model: 'User'
          }
        })
        .then((blogs: any) => {
          return blogs;
        })
    }
  },

  Mutation: {
    async addBlog(_, inputObject) {
      return Blogs.create(inputObject.input).then((blogInfo: any) => {
        return blogInfo;
      });
    },

    async updateBlog(_, inputObject) {
      return Blogs.updateOne({ _id: inputObject.id }, inputObject.input).then((blogInfo: any) => {
        return blogInfo;
      });
    }
  }
};

export default resolverMap;
