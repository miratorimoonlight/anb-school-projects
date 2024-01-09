import { apiSlice } from "@/utils/apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    order: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: () => ["Order"],
    }),
  }),
});

export const { useOrderMutation } = orderApiSlice;
