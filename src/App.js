import React, { useState, useEffect } from 'react';
import bootstrap from 'bootstrap';
import './App.css';
import {Route, BrowserRouter} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { loadPosts } from './redux/actions/postAction';

import LoginPage from './pages/login';
import IndexPage from './pages/index';
import AboutPage from './pages/history';

import { isAuthenticated } from './redux/constants/post'
// import ContactPage from './pages/contact';

function App(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  const data = useSelector((state) => state.posts.data);
  const requesting = useSelector((state) => state.posts.requesting);
  
  return (
    <BrowserRouter>
      {/* <Route exact path="/" component={IndexPage}/> */}
      <Route exact path="/" render={props => {
        return(
           isAuthenticated?
          <IndexPage {...props} title="Trang chủ" href="/dashboard" /> : 
          <LoginPage {...props} title="Đăng nhập" href="/login" />
        )
      }} />
      <Route exact path="/history" render={props => <AboutPage {...props} title="Lịch sử" href="/history"/>} />
      {/* <Route exact path="/contact" render={props => <ContactPage {...props} title="Liên hệ" />}/> */}
    </BrowserRouter>
  );
}

export default App;