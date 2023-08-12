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
import professorServices from './services/professors';

const getUserData = async () => {
  const response = await userServices.getAll();
  console.log(response);
}

const getCourseData = async () => {
  const response = await courseServices.getAll();
  console.log(response);
}

const getProfessorData = async () => {
  const response = await professorServices.getAll();
  console.log(response);
}

const App = () => {

  useEffect(() => {
    console.log('App initialised');
    getUserData();
    getCourseData();
    getProfessorData();
  }, [])

  return <>App initialised</>
}

export default App;
