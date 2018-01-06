const fetch = require('node-fetch');
const { createError } = require('apollo-errors');
const { withFilter } = require('graphql-subscriptions');

const pubsub = require('../../pubsub')();

const DEFAULT_SYMBOL = 'GOOG';

const ApiError = createError('Third party api error', {
  message: 'An error occured requesting a third API'
});

const getQuoteFromIextrading = async (symbol = DEFAULT_SYMBOL) => {
  const response = await fetch(
    `https://api.iextrading.com/1.0/stock/${symbol}/quote`
  );
  if (response.status !== 200) {
    throw new ApiError({ data: { statusText: response.statusText } });
  }
  return response.json();
};

setInterval(async () => {
  const quote = await getQuoteFromIextrading();
  pubsub.publish('newQuote', { realtime: quote });
  console.log('[DEBUG] Publish quote', quote);
}, 10000);

module.exports = {
  Query: {
    async getQuote(root, { symbol }) {
      return await getQuoteFromIextrading(symbol);
    }
  },
  Subscription: {
    realtime: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('newQuote'),
        (payload, variables) => payload.realtime.symbol === variables.symbol
      )
    }
  }
};
