import { combineReducers } from '@reduxjs/toolkit'
import modalReducer from '../features/modal/modalSlice'
// import appReducer from '../features/app/appSlice'
import dataReducer from '../features/data/dataSlice'

const rootReducer = combineReducers({
  modal: modalReducer,
  // app: appReducer,
  data: dataReducer,
})

export default rootReducer
