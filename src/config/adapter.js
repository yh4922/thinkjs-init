const fileCache = require('think-cache-file');
const nunjucks = require('think-view-nunjucks');
// const fileSession = require('think-session-file');
const JWTSession = require('think-session-jwt');
const mongoose = require('think-mongoose');
const {Console, File, DateFile} = require('think-logger3');
const path = require('path');
const isDev = think.env === 'development';


/**
 * cache adapter config
 * @type {Object}
 */
exports.cache = {
  type: 'file',
  common: {
    timeout: 24 * 60 * 60 * 1000 // millisecond
  },
  file: {
    handle: fileCache,
    cachePath: path.join(think.ROOT_PATH, 'runtime/cache'), // absoulte path is necessarily required
    pathDepth: 1,
    gcInterval: 24 * 60 * 60 * 1000 // gc interval
  }
};

// 使用用户授权连接
// exports.model = {
//   type: 'mongoose',
//   mongoose: {
//     handle: mongoose,
//     host: '192.168.1.148',
//     user: 'bbstest',
//     password: '123456',
//     database: 'bbstest',
//     useCollectionPlural: false,
//     options: {}
//   }
// }
// 不需要用户密码连接
exports.model = {
  type: 'mongoose',
  mongoose: {
    handle: mongoose,
    connectionString: 'mongodb://localhost:27017/sn_tongji',
    options: { config: {autoIndex: false} }
  }
}

/**
 * session adapter config
 * @type {Object}
 * // 获取Token
 * var token =  await this.session('key')
 *  if (!token) {
 *    return this.fail(1003, 'Login exception');
 *  }
 *
 *  // 设置Token
 *  var token = await this.session('key', data) // 生成Token
 */
exports.session = {
  type: 'jwt',
  common: {
    cookie: {
      name: 'thinkjs',
    }
  },
  jwt: {
    handle: JWTSession,
    secret: 'hgzxcsa472135', // secret is reqired // 密钥
    tokenType: 'header', // ['query', 'body', 'header', 'cookie'], 'cookie' is default // token来源 header
    tokenName: 'jwt', // if tokenType not 'cookie', this will be token name, 'jwt' is default // token 名字
    sign: {},
    verify: {},
    verifyCallback: any => any, // default verify fail callback
  }
}

/**
 * view adapter config
 * @type {Object}
 */
exports.view = {
  type: 'nunjucks',
  common: {
    viewPath: path.join(think.ROOT_PATH, 'view'),
    sep: '_',
    extname: '.html'
  },
  nunjucks: {
    handle: nunjucks
  }
};

/**
 * logger adapter config
 * @type {Object}
 */
exports.logger = {
  type: isDev ? 'console' : 'dateFile',
  console: {
    handle: Console
  },
  file: {
    handle: File,
    backups: 10, // max chunk number
    absolute: true,
    maxLogSize: 50 * 1024, // 50M
    filename: path.join(think.ROOT_PATH, 'logs/app.log')
  },
  dateFile: {
    handle: DateFile,
    level: 'ALL',
    absolute: true,
    pattern: '-yyyy-MM-dd',
    alwaysIncludePattern: true,
    filename: path.join(think.ROOT_PATH, 'logs/app.log')
  }
};
