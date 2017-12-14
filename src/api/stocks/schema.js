const typeDefs = `
scalar Time

type Quote {
  avgTotalVolume: Int
  calculationPrice: String
  change: Float
  changePercent: Float
  close: Float
  closeTime: Float
  companyName: String!
  delayedPrice: Float
  delayedPriceTime: Float
  high: Float
  iexAskPrice: Int
  iexAskSize: Int
  iexBidPrice: Int
  iexBidSize: Int
  iexLastUpdated: Int
  iexMarketPercent: Float
  iexRealtimePrice: Float
  iexRealtimeSize: Int
  iexVolume: Int
  latestPrice: Float
  latestSource: String
  latestTime: Time
  latestUpdate: Float
  latestVolume: Int
  low: Float
  marketCap: Float
  open: Float
  openTime: Int
  peRatio: Float
  previousClose: Float
  primaryExchange: String
  sector: String
  symbol: String
  week52High: Float
  week52Low: Float
  ytdChange: Float
}

type Query {
  getQuote(symbol: String): Quote
}

type Subscription {
  realtime(symbol: String): Quote
}
`;

module.exports = typeDefs;
