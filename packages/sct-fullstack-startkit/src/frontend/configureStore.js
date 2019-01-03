import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth'],
};

// For create persistent redux's store
// Ref: https://github.com/rt2zz/redux-persist
// Ref: https://github.com/rt2zz/redux-persist#blacklist--whitelist
export default (initState) => {
  const persistedReducer = persistReducer(persistConfig, reducer);
  const store = createStore(persistedReducer, initState);
  const persistor = persistStore(store);
  return { store, persistor };
};
