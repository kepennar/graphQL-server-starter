const fetch = require('node-fetch');
const { createError } = require('apollo-errors');
const { withFilter } = require('graphql-subscriptions');

const pubsub = require('../../pubsub')();

const DEFAULT_SYMBOL = 'GOOG';

const ApiError = createError('Third party api error', {
  message: 'An error occured requesting a third API'
});

module.exports = {
  Query: {
    async getQuote(root, { symbol }) {
      const response = await fetch(
        `https://api.iextrading.com/1.0/stock/${symbol || DEFAULT_SYMBOL}/quote`
      );
      if (response.status !== 200) {
        throw new ApiError({ data: { statusText: response.statusText } });
      }
      return await response.json();
    }
  },
  Subscription: {
    realtime: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('newQuote'),
        (payload, variables) => payload.channelId === variables.channelId
      )
    }
  }
};
