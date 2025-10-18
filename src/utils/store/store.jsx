import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../reducers/authSlice';
import { loginApi } from '../../services/loginService';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};

const persisAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persisAuthReducer,
    [loginApi.reducerPath]: loginApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(loginApi.middleware),
});

export const persistor = persistStore(store);
