import merge from 'lodash.merge'

// set up a default for our NODE_ENV
// node_env equals whatever it was, but if it wasn't anything then set to "development"
// don't want to overwrite it if it already existed, but if it didn't please set to "development"
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const stage = process.env.STAGE || 'local';

// create dynamic config based on the environment
let envConfig;

if (stage === 'production') {
  // .default if for interop between es6 modules and common js or non es6 mods
  envConfig = require('./prod').default;
} else if (stage === 'testing') {
  envConfig = require('./testing').default;
} else {
  envConfig = require('./local').default;
}

// export default config underneath our env config
// these are our defaults, can be over written depending on what environment we're in.
export default merge({
  stage,
  env: process.env.NODE_ENV,
  port: 3001,
  secrets: {
    jwt: process.env.JWT_SECRET,
    dbURL: process.env.DATABASE_URL,
  }
}, envConfig)