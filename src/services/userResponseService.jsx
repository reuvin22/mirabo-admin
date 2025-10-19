import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const userResponseApi = createApi({
  reducerPath: 'userResponseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['UserResponse'],
  endpoints: (builder) => ({
    userResponse: builder.query({
      query: ({ search = "", page = 1, limit = 5 }) => ({
        url: `v1/answers?search=${search}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ['UserResponse'],
    }),

    deleteUserResponse: builder.mutation({
      query: (id) => ({
        url: `v1/answers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['UserResponse'],
    }),

    exportUserAnswers: builder.mutation({
      query: (userId) => ({
        url: `export-answers/${userId}`,
        method: 'GET',
        responseHandler: async (response) => {
          const blob = await response.blob();
          return blob;
        },
      }),
    }),
  }),
});

export const {
  useUserResponseQuery,
  useDeleteUserResponseMutation,
  useExportUserAnswersMutation,
} = userResponseApi;
