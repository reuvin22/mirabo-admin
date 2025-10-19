import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const uploadApi = createApi({
  reducerPath: 'uploadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    uploadCsv: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: 'v1/data-import',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const { useUploadCsvMutation } = uploadApi;
