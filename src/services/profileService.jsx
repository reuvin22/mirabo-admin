import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['UserManagement'],
  endpoints: (builder) => ({
    profile: builder.query({
      query: () => ({
        url: 'v1/auth/profile',
        method: 'GET',
      }),
    }),
    updateAuthUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `v1/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ['UserManagement'],
    }),
  }),
});

export const { useProfileQuery, useUpdateAuthUserMutation } = profileApi;
