import { configureStore } from '@reduxjs/toolkit'

import userReducer from './reducers/userReducer';
import usersReducer from './reducers/usersReducer';
import coursesReducer from './reducers/coursesReducer';
import professorsReducer from './reducers/professorsReducer';
import courseReviewsReducer from './reducers/courseReviewsReducer';
import professorReviewsReducer from './reducers/professorReviewsReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    courses: coursesReducer,
    professors: professorsReducer,
    courseReviews: courseReviewsReducer,
    professorReviews: professorReviewsReducer,
  }
})

export default store;