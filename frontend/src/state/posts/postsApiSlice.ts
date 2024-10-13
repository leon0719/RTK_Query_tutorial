import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../../types/Post";

export const postsApiSlice = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], { limit: number; offset: number }>({
      query: ({ limit, offset }) => `posts?_limit=${limit}&_offset=${offset}`,
    }),
    createPost: builder.mutation<Post, Omit<Post, "id">>({
      query: (post) => ({
        url: "posts",
        method: "POST",
        body: post,
      }),
    }),
  }),
});

// 命名規則:
// 對於 query endpoints，生成 use[EndpointName]Query hook。
// 對於 mutation endpoints，生成 use[EndpointName]Mutation hook。

export const { useGetPostsQuery, useCreatePostMutation } = postsApiSlice;
