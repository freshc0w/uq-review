import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import Togglable from "./Togglable";

const CourseReviewForm = () => {
  const courseReviewFormRef = useRef();
    return (
        <Togglable
          buttonLabel="New Review"
          ref={courseReviewFormRef}>
            <h1>Course Review Form</h1>
        </Togglable>
    )
}

export default CourseReviewForm;