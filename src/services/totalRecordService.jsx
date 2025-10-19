import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const totalRecordApi = createApi({
  reducerPath: 'totalRecordApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    totalAnswer: builder.query({
      query: (params) => ({
        url: 'v1/answer-count',
        method: 'GET',
        params,
      }),
    }),
    totalUser: builder.query({
      query: (params) => ({
        url: 'v1/user-count',
        method: 'GET',
        params,
      }),
    }),
    totalLineUser: builder.query({
      query: (params) => ({
        url: 'v1/total-line-user',
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const {
  useTotalAnswerQuery,
  useTotalUserQuery,
  useTotalLineUserQuery,
} = totalRecordApi;
