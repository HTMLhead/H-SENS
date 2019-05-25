import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from '../component/presenter/layouts/Main';
import SignIn from '../component/presenter/layouts/SignIn';
import SignUp from '../component/presenter/layouts/SignUp';
import UserPage from '../component/presenter/layouts/User';
import Searched from '../component/presenter/layouts/Searched';
import UserEditor from '../component/container/user/UserEditor';
import WorksEditor from '../component/container/work/WorksEditor';
import { MainProvider } from '../context/mainContext';

const AppPath = ({ isLoggedIn }) => (
  <Router>
    <Route path="/" exact component={MainPage} />
    <Route path="/search" component={Searched} />
    {/* <MainProvider>
      <Route path="/" exact component={MainPage} />
      <Route path="/user" component={UserPage} />
      <Route path="/workeditor" render={props => <WorksEditor {...props} />} />
      <Route path="/searchedUser" component={UserPage} />
      <Route path="/usereditor" component={UserEditor} />
      <Route path="/searched" component={Searched} />
    </MainProvider>
    <Route path="/signin" render={() => (isLoggedIn ? <MainPage /> : <SignIn />)} />
    <Route path="/signup" render={() => (isLoggedIn ? <MainPage /> : <SignUp />)} /> */}
  </Router>
);

export default AppPath;
