import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentUser: localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : null,

  isLoading: false,
  error: {},
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    requestPending: (state) => {
      state.isLoading = true
    },
    requestFail: (state, { payload }) => {
      state.isLoading = false
      state.error = payload || {}
    },
    loginSuccess: (state, { payload }) => {
      state.currentUser = payload
      localStorage.setItem("currentUser", JSON.stringify(payload))
    },
    logoutSuccess: (state) => {
      state.currentUser = null
      localStorage.removeItem("currentUser")
    },
  },
})

const { reducer, actions } = authSlice

export const { requestPending, requestFail, loginSuccess, logoutSuccess } =
  actions

export default reducer
