import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import rootReducer, { RootState } from './rootReducer'
import customMiddleware from './customMiddleware' // Assuming you implemented customMiddleware

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customMiddleware),
})

// export type AppDispatch = typeof store.dispatch;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
