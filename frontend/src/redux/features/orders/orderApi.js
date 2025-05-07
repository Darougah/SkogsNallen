import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utils/baseURL";

const orderApi = createApi({
  reducerPath:'orderApi',
  baseQuery:fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/orders`,
    credentials:'include'
  }),
  tagTypes:["Order"],
  endpoints:(builder)=>({
    getOrdersByEmail:builder.query({
      query:(email)=>({
        url: `/${email}`,
        methid:'GET'
      })
    })
  })
})



export const {useGetOrdersByEmailQuery} = orderApi;
export default orderApi