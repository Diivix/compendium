import { createStore } from "redux";
import { devToolsEnhancer } from 'redux-devtools-extension';
import { reducer } from "./reducers";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'compendium',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

export default () => {
  let store = createStore(persistedReducer, devToolsEnhancer({}))
  let persistor = persistStore(store)
  return { store, persistor }
}