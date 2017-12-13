const Koa = require('koa');
const helmet = require('koa-helmet');
const accesslog = require('koa-accesslog');
const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');

const health = require('./health');
const serverConfig = require('./config').get('server');
const api = require('./api');

const app = new Koa();

app.use(helmet());
app.use(accesslog());
app.use(compress());
app.use(bodyParser());

// Possibility to customize path and checks
//  app.use(health('/ping', [async () => { Check connectivity} ]));
app.use(api.routes(), api.allowedMethods());
app.use(health());

app.listen(serverConfig.port);
console.log('listening on port', serverConfig.port);
