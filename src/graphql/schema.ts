import 'graphql-import-node';
import * as rootDefs from './schemas/schema.graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers/resolvers';

const schema = makeExecutableSchema({
  typeDefs: [rootDefs],
  resolvers,
});

export default schema;
