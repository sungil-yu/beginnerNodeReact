import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducer/user_reducer/user_reducer';

const store = configureStore({
  reducer: {
    user: userReducer
  },
})

export default store;