import React, { useState, useEffect } from 'react';
import bootstrap from 'bootstrap';
import './App.css';
import {Route, BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import LoginPage from './pages/login';
import IndexPage from './pages/index';
import AboutPage from './pages/history';
// import ContactPage from './pages/contact';

var isAuthenticated = true;

function App(props) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <Route exact path="/" component={IndexPage}/> */}
        {/* <Route exact path="/contact" render={props => <ContactPage {...props} title="Liên hệ" />}/> */}
        {isAuthenticated?
          <>
            <Route exact path="/" render={props => <IndexPage {...props} title="Trang chủ" />} />
            <Route exact path="/history" render={props => <AboutPage {...props} title="Lịch sử" href="/history"/>} />
          </>:
          <Route exact path="/" render={props => <LoginPage {...props} title="Đăng nhập" />} />
        }
      </BrowserRouter>
    </Provider>
  );
}

export default App;