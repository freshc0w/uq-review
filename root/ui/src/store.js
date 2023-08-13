import { configureStore } from '@reduxjs/toolkit'

import userReducer from './reducers/userReducer';
import usersReducer from './reducers/usersReducer';
import courseReviewsReducer from './reducers/courseReviewsReducer';
import professorReviewsReducer from './reducers/professorReviewsReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    courseReviews: courseReviewsReducer,
    professorReviews: professorReviewsReducer,
  }
})

export default store;