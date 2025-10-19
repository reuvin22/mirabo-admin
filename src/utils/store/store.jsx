import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../reducers/authSlice';
import { loginApi } from '../../services/loginService';
import { profileApi } from '../../services/profileService';
import { totalRecordApi } from '../../services/totalRecordService';
import { userManagementApi } from '../../services/userManagementService';
import { userResponseApi } from '../../services/userResponseService';
import { uploadApi } from '../../services/uploadService';

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
    [profileApi.reducerPath]: profileApi.reducer,
    [totalRecordApi.reducerPath]: totalRecordApi.reducer,
    [userManagementApi.reducerPath]: userManagementApi.reducer,
    [userResponseApi.reducerPath]: userResponseApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
    .concat(
      loginApi.middleware,
      profileApi.middleware,
      totalRecordApi.middleware,
      userManagementApi.middleware,
      userResponseApi.middleware,
      uploadApi.middleware)
});

export const persistor = persistStore(store);
