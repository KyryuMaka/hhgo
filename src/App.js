import React, { useState } from 'react';
import bootstrap from 'bootstrap';
import './App.css';
import {Route, BrowserRouter, Redirect} from 'react-router-dom';

import LoginPage from './pages/login';
import IndexPage from './pages/index';
import AboutPage from './pages/history';
// import ContactPage from './pages/contact';

function App(props) {
  const [isUserAuthenticated, setUserAuthenticated] = useState(false);
  
  return (
    <BrowserRouter>
      {/* <Route exact path="/" component={IndexPage}/> */}
      <Route exact path="/" render={props => {
        return(
          isUserAuthenticated ?
          <IndexPage {...props} handleChange={isUserAuthenticated} title="Trang chủ" href="/dashboard" /> : 
          <LoginPage {...props} title="Đăng nhập" href="/login"/>
        )
      }} />
      <Route exact path="/history" render={props => <AboutPage {...props} title="Lịch sử" href="/history"/>} />
      {/* <Route exact path="/contact" render={props => <ContactPage {...props} title="Liên hệ" />}/> */}
    </BrowserRouter>
  );
}

export default App;