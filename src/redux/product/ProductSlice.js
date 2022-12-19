import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  products: [],
  isLoading: false,
  error: {},
  selectedProduct: {},
}

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    requestPending: (state) => {
      state.isLoading = true
    },
    requestFail: (state, { payload }) => {
      state.isLoading = false
      state.error = payload || {}
    },
    getProductsSuccess: (state, { payload }) => {
      state.isLoading = false
      state.products = payload
    },
    getSingleProductSuccess: (state, { payload }) => {
      state.isLoading = false
      state.selectedProduct = payload
    },
  },
})

const { reducer, actions } = productSlice
export const {
  requestPending,
  requestFail,
  getProductsSuccess,
  getSingleProductSuccess,
} = actions

export default reducer
