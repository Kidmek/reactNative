import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  isError: false,
  data: null,
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const { setLoading } = dataSlice.actions

export default dataSlice.reducer

export const selectIsLoading = (state) => state.data.isLoading
export const selectIsError = (state) => state.data.isError
export const selectData = (state) => state.data.data
