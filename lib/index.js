'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.offlineCompose = exports.createOfflineReducer = exports.networkStatusChangedAction = undefined;

var _redux = require('redux');

var _reduxPersist = require('redux-persist');

var _middleware = require('./middleware');

var _updater = require('./updater');

var _config = require('./config');

var _actions = require('./actions');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
/*global $Shape*/


/* // @TODO: Take createStore as config?

// eslint-disable-next-line no-unused-vars
let persistor;

export const offline = (userConfig: $Shape<Config> = {}) => (createStore: any) => (
  reducer: any,
  preloadedState: any
) => {
  console.log('user config', userConfig);
  const config = applyDefaults(userConfig);

  console.log('Creating offline store', config);

  // wraps userland reducer with a top-level
  // reducer that handles offline state updating
  const offlineReducer = enhanceReducer(reducer);

  const offlineMiddleware = applyMiddleware(createOfflineMiddleware(config));

  // create autoRehydrate enhancer if required
  const offlineEnhancer = compose(offlineMiddleware);

  // create store
  const store = createStore(offlineReducer, preloadedState, applyMiddleware(createOfflineMiddleware(config)));

  // launch store persistor
  if (config.persist) {
    persistor = config.persist(store, config.persistOptions, config.persistCallback);
  }

  // launch network detector
  if (config.detectNetwork) {
    config.detectNetwork(online => {
      store.dispatch(networkStatusChanged(online));
    });
  }

  return store;
};*/
var networkStatusChangedAction = exports.networkStatusChangedAction = _actions.networkStatusChanged;

var createOfflineReducer = exports.createOfflineReducer = function createOfflineReducer(reducers) {
  return (0, _updater.enhanceReducer)(reducers);
};

var offlineCompose = exports.offlineCompose = function offlineCompose() {
  var userConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (middleware, funcs) {
    userConfig.log && console.log('user config', userConfig);
    var config = (0, _config.applyDefaults)(userConfig);

    userConfig.log && console.log('Creating offline store', config);

    var offlineMiddleware = (0, _middleware.createOfflineMiddleware)(config);

    return _redux.compose.apply(undefined, [(0, _reduxPersist.autoRehydrate)(config.persistOptions.autoRehydrate), _redux.applyMiddleware.apply(undefined, [offlineMiddleware].concat(_toConsumableArray(middleware)))].concat(_toConsumableArray(funcs)));
  };
};