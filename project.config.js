
const path = require('path')
const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  env          : NODE_ENV,
  __PROD__     : NODE_ENV === 'production',
  __DEV__      : NODE_ENV === 'development',
  domain       : process.env.domain || 'http://localhost:4000',
  globals      : {
    __DESKTOP__  : true
  },
  basePath     : __dirname,
  srcDir       : 'src',
  outDir       : 'dist',
  publicPath   : '',
  sourcemaps   : true,
  manifest     : 'dll/[name]-manifest.json',
  vendors      : {
    'vendor_0': [
      'babel-polyfill',
      'react-hot-loader'
    ],
    'vendor_1': [
      'react',
      'react-dom'
    ],
    'vendor_2': [
      'redux',
      'react-redux',
      'redux-logger',
      'redux-thunk',
      'react-router',
      'react-router-dom',
      'react-router-redux',
      'prop-types',
      'localforage',
      'http-services',
      'moment'
    ],
    'vendor_3': [
      'kenote-react-admin-modal',
      'kenote-react-admin-passport',
    ]
  },
  entry        : {
    index: './index.js'
  },
  alias        : {
    assets         : path.resolve(__dirname, 'src/assets'),
    components     : path.resolve(__dirname, 'src/components'),
    config         : path.resolve(__dirname, 'src/config'),
    containers     : path.resolve(__dirname, 'src/containers'),
    features       : path.resolve(__dirname, 'src/features'),
    modals         : path.resolve(__dirname, 'src/modals'),
    passport       : path.resolve(__dirname, 'src/passport'),
    reduxs         : path.resolve(__dirname, 'src/reduxs'),
    services       : path.resolve(__dirname, 'src/services'),
    store          : path.resolve(__dirname, 'src/store'),
    styles         : path.resolve(__dirname, 'src/styles'),
  }
}