// @flow
/*global $Shape*/
import type { Config } from './types';
import { applyMiddleware, compose } from 'redux';
import { autoRehydrate } from 'redux-persist';
import { createOfflineMiddleware } from './middleware';
import { enhanceReducer } from './updater';
import { applyDefaults } from './config';
import { networkStatusChanged } from './actions';

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
export const networkStatusChangedAction = networkStatusChanged;

export const createOfflineReducer = (reducers) => enhanceReducer(reducers);

export const offlineCompose = (userConfig: $Shape<Config> = {}) => (middleware, funcs) => {
  userConfig.log && console.log('user config', userConfig);
  const config = applyDefaults(userConfig);

  userConfig.log && console.log('Creating offline store', config);

  const offlineMiddleware = createOfflineMiddleware(config);

  return compose(autoRehydrate(config.persistOptions.autoRehydrate), applyMiddleware(offlineMiddleware, ...middleware), ...funcs);
};
