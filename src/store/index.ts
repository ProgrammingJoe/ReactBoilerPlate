import { configureStore } from '@reduxjs/toolkit'
import constantReducer, { ConstantsState } from './constantSlice'

const store = configureStore({
  reducer: {
    constants: constantReducer
  }
})

export interface Store {
  constants: ConstantsState
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
