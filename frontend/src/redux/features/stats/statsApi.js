import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utils/baseURL";

const statsApi = createApi({
  reducerPath: "statsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/stats`,
    credentials: "include",
  }),
  tagTypes: ["stats"],
  endpoints: (builder) => ({
    getUserStats: builder.query({
      query: (email) => `/user-stats/${email}`,
      providesTags: ["stats"],
    }),
    getAdminStats: builder.query({
      query: () => "/admin-stats",
      providesTags: ["stats"],
    }),
  }),
});

export const { useGetUserStatsQuery, useGetAdminStatsQuery } = statsApi;
export default statsApi;
