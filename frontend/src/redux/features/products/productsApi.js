

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utils/baseURL";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/products`,
    credentials: "include",                       
    prepareHeaders: (headers, { getState }) => {  
      const token =
        getState().auth.token || localStorage.getItem("token");
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Products"],

  endpoints: (builder) => ({
    /* ---------- Queries ---------- */
    fetchAllProducts: builder.query({
      query: ({ category, color, minPrice, maxPrice, page = 1, limit = 10 }) => {
        const qs = new URLSearchParams({
          category: category || "",
          color:    color    || "",
          minPrice: minPrice || 0,
          maxPrice: maxPrice || "",
          page:     page.toString(),
          limit:    limit.toString(),
        }).toString();
        return `/?${qs}`;
      },
      providesTags: ["Products"],
    }),

    fetchProductById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (r, e, id) => [{ type: "Products", id }],
    }),

    useFetchRelatedProduct: builder.query({
      query: (id) => `/related/${id}`,
    }),

    addProduct: builder.mutation({
      query: (body) => ({
        url: "/create-product",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/update-product/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (r, e, { id }) => ["Products", { type: "Products", id }],
    }),

    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (r, e, id) => ["Products", { type: "Products", id }],
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useFetchProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useFetchRelatedProductQuery,
} = productsApi;
export default productsApi;
