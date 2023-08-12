// TODO: get services working
// courseReviews
// courses
// professorReviews
// professors
// user
// login
import usersServices from './services/users';
import { useEffect } from 'react';

const getUserData = async () => {
  const response = await usersServices.getAll();
  console.log(response);
}

const App = () => {

  useEffect(() => {
    console.log('App initialised');
    getUserData();
  }, [])

  return <>App initialised</>
}

export default App;
