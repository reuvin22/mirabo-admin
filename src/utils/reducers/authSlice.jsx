import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { userLogin, userGrants } from '../actions/authActions';

const userToken = Cookies.get('token') || null;
const isLoggedIn = Cookies.get('isLoggedIn') || null;

const initialState = {
  loading: false,
  userDetails: null,
  userInfo: null,
  userToken,
  error: null,
  success: false,
  isLoggedIn,
  module: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      Cookies.remove('token');
      Cookies.remove('isLoggedIn');
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      state.isLoggedIn = false;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userGrants.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(userGrants.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.module = action.payload;
      })
      .addCase(userGrants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;