import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const userManagementApi = createApi({
  reducerPath: 'userManagementApi',
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
    userManagement: builder.query({
      query: ({ search = "", page = 1, limit = 5 }) => ({
        url: `v1/users?search=${search}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ['UserManagement'],
    }),

    deleteUserManagement: builder.mutation({
      query: (id) => ({
        url: `v1/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['UserManagement'],
    }),

    createUserManagement: builder.mutation({
      query: (body) => ({
        url: `v1/users`,
        method: "POST",
        body,
      }),
      invalidatesTags: ['UserManagement'],
    }),

    updateUserManagement: builder.mutation({
      query: ({ id, body }) => ({
        url: `v1/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ['UserManagement'],
    }),

  }),
});

export const {
  useUserManagementQuery,
  useDeleteUserManagementMutation,
  useCreateUserManagementMutation,
  useUpdateUserManagementMutation,
} = userManagementApi;
