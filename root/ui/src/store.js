import { configureStore } from '@reduxjs/toolkit'

import userReducer from './reducers/userReducer';
import usersReducer from './reducers/usersReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
  }
})

export default store;