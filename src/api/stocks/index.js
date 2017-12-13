const {
  makeExecutableSchema,
  addMockFunctionsToSchema
} = require('graphql-tools');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const types = require('./types');

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers: { ...resolvers, ...types }
});
