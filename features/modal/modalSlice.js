import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  view: false,
  confirm: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    show: (state) => {
      state.view = true
    },
    hide: (state) => {
      state.view = false
    },
    toggleModal: (state) => {
      state.view = !state.view
    },
    showConfirm: (state) => {
      state.confirm = true
    },
    hideConfirm: (state) => {
      state.confirm = false
    },
  },
})

export const { show, hide, toggleModal, showConfirm, hideConfirm } =
  modalSlice.actions

export const selectView = (state) => state.modal.view
export const selectConfirm = (state) => state.modal.confirm

export default modalSlice.reducer
