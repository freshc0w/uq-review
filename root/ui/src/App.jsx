// TODO: get services working
// courseReviews
// courses
// professorReviews
// professors
// user
// login
import { useEffect } from 'react';
import userServices from './services/users';
import courseServices from './services/courses';

const getUserData = async () => {
  const response = await userServices.getAll();
  console.log(response);
}

const getCourseData = async () => {
  const response = await courseServices.getAll();
  console.log(response);
}

const App = () => {

  useEffect(() => {
    console.log('App initialised');
    getUserData();
    getCourseData();
  }, [])

  return <>App initialised</>
}

export default App;
