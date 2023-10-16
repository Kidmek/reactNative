import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  isFetching: false,
  isError: false,
  data: null,
  user: null,
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setFetching: (state, action) => {
      state.isFetching = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { setLoading, setFetching, setUser } = dataSlice.actions

export default dataSlice.reducer

export const selectIsFetching = (state) => state.data.isFetching
export const selectIsLoading = (state) => state.data.isLoading
export const selectIsError = (state) => state.data.isError
export const selectData = (state) => state.data.data
export const selectUser = (state) => state.data.user
