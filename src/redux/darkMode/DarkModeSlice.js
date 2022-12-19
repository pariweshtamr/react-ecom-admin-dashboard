import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  darkMode: false,
}

const darkModeSlice = createSlice({
  name: "darkModeState",
  initialState,
  reducers: {
    light: (state) => {
      state.darkMode = false
      sessionStorage.setItem("darkMode", JSON.stringify(state.darkMode))
    },
    dark: (state) => {
      state.darkMode = true
      sessionStorage.setItem("darkMode", JSON.stringify(state.darkMode))
    },
    toggle: (state) => {
      state.darkMode = !state.darkMode
      sessionStorage.setItem("darkMode", JSON.stringify(state.darkMode))
    },
  },
})

const { reducer, actions } = darkModeSlice

export const { light, dark, toggle } = actions

export default reducer
