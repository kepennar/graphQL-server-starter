const convict = require('convict');
require('dotenv').config();

const config = convict({
  server: {
    port: {
      doc: 'server port',
      format: 'port',
      default: 3000,
      env: 'PORT'
    }
  },
  log: {
    format: {
      doc: 'Log format',
      format: '*',
      default: 'access',
      env: 'LOG_FORMAT'
    }
  },
  redis: {
    host: {
      doc: 'Redis server host',
      format: '*',
      default: 'localhost',
      env: 'REDIS_HOST'
    },

    port: {
      doc: 'Redis server port',
      format: 'port',
      default: 6379,
      env: 'REDIS_PORT'
    }
  },
  subscription: {
    mode: {
      doc: 'Subscription pubsub mode',
      format: '*',
      default: 'simple',
      env: 'SUBSCRIPTION_MODE'
    }
  }
});

config.validate({ allowed: 'strict' });
module.exports = config;
