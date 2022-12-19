import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  users: [],
  isLoading: false,
  error: {},
  singleUser: {},
}

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    requestPending: (state) => {
      state.isLoading = true
    },
    requestFail: (state, { payload }) => {
      state.isLoading = false
      state.error = payload || {}
    },
    getUsersSuccess: (state, { payload }) => {
      state.isLoading = false
      state.users = payload
    },
    getSingleUserSuccess: (state, { payload }) => {
      state.isLoading = false
      state.singleUser = payload
    },
    addUserSuccess: (state, { payload }) => {
      state.isLoading = false
      state.singleUser = payload
    },
    deleteUserSuccess: (state, { payload }) => {
      state.isLoading = false
      state.users = payload
    },
  },
})

const { reducer, actions } = userSlice
export const {
  requestPending,
  requestFail,
  getUsersSuccess,
  getSingleUserSuccess,
  addUserSuccess,
  deleteUserSuccess,
} = actions

export default reducer
