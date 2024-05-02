const customMiddleware = (store) => (next) => (action) => {
  // You can access dispatch and selectors here
  const dispatch = store.dispatch
  const state = store.getState()

  // Pass dispatch and state to the action being dispatched
  const modifiedAction = { ...action, dispatch, state }

  return next(modifiedAction)
}

export default customMiddleware
