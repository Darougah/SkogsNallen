import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utils/baseURL";



export const reviewApi = createApi ({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQuery({
    baseUrl:`${getBaseURL()}/api/reviews`,
    credentials:'include',
  }),
  tagTypes:["reviews"],
  endpoints:(builder)=>({
    postReview:builder.mutation({
      query:(reviewData)=>({
        url:"/post-review",
        method:"POST",
        body: reviewData
      }),
      invalidatesTags:(result, error, {productId })=>[{type:"reviews", id:productId }]
    }),
    getReviewsCount: builder.query({
      query:()=>({
        url:"/total-reviews"
      }),
    }),
    getReviewsByUserId: builder.query({
      query:(userId)=>({
        url:`/${userId}`
      }),
      providesTags:(result)=> result ? [{type:"Reviews", id: result[0]?.email}] : []
    })
  })
})


export const {usePostReviewMutation, useGetReviewsCountQuery, useGetReviewsByUserIdQuery} = reviewApi

export default reviewApi;