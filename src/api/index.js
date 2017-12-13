const Router = require('koa-router');
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');
const { formatError } = require('apollo-errors');

const schema = require('./stocks');

const apiRouter = new Router();
apiRouter.post('/graphql', graphqlKoa({ formatError, schema }));
apiRouter.get('/graphql', graphqlKoa({ formatError, schema }));

apiRouter.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

module.exports = apiRouter;
