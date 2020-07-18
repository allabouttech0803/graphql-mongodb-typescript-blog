import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';
import { MongoDB } from './config/mongo';
import { MongoHelper } from './helpers/mongoHelpers';

const app = express();
const mHelper = new MongoHelper();

const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  playground: true,
  context: async ({ req }) => {
    return await mHelper.validateUser(req);
  }
});

app.use('*', cors());
app.use(compression());
server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);
const db = new MongoDB();

httpServer.listen({ port: 4000 }, (): void =>
  console.log(`\n🚀 GraphQL is now running on http://localhost:4000/graphql`)
);
