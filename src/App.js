import React, { useState } from 'react';
import bootstrap from 'bootstrap';
import './App.css';
import {Route, BrowserRouter, Redirect} from 'react-router-dom';

import LoginPage from './pages/login';
import IndexPage from './pages/index';
import AboutPage from './pages/history';
// import ContactPage from './pages/contact';

function App() {
  const [isUserAuthenticated, setUserAuthenticated] = useState(true);

  var authenticateCallBack = (loginData) => {
    setUserAuthenticated(loginData);
  };

  return (
    <BrowserRouter>
      {/* <Route exact path="/" component={IndexPage}/> */}
      <Route exact path="/" render={() => {
        return(
          isUserAuthenticated ?
          <Redirect to={{pathname: "/dashboard", state:{title: "Trang chủ", href:"/dashboard"}}}/> :
          <Redirect to="/login" />
        )
      }} />
      <Route exact path="/login" render={props => <LoginPage {...props} title="Đăng nhập" href="/login"/>} />
      <Route exact path="/dashboard" render={props => <IndexPage {...props} title="Trang chủ" href="/dashboard"/>} />
      <Route exact path="/history" render={props => <AboutPage {...props} title="Lịch sử" href="/history"/>} />
      {/* <Route exact path="/contact" render={props => <ContactPage {...props} title="Liên hệ" />}/> */}
    </BrowserRouter>
  );
}

export default App;