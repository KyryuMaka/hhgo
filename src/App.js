import React from 'react';
import bootstrap from 'bootstrap';
import './App.css';
import {Route, BrowserRouter} from 'react-router-dom';
import { useSelector } from 'react-redux';

import SideBar from './components/sideBar'

import LoginPage from './pages/login';
import IndexPage from './pages/index';
import AboutPage from './pages/history';
// import ContactPage from './pages/contact';

function App(props) {
  const {isAuthenticated} = useSelector((state) => state.auth);
  console.log(isAuthenticated);
  return (
    <BrowserRouter>
      {/* <Route exact path="/" component={IndexPage}/> */}
      {/* <Route exact path="/contact" render={props => <ContactPage {...props} title="Liên hệ" />}/> */}
      {isAuthenticated?
        <>
          <div className="d-flex">
            <SideBar />
            <Route exact path="/" render={props => <IndexPage {...props} title="Trang chủ" />} />
            <Route exact path="/history" render={props => <AboutPage {...props} title="Lịch sử"/>} />
          </div>
        </>:
        <Route exact path="/" render={props => <LoginPage {...props} title="Đăng nhập" />} />
      }
    </BrowserRouter>
  );
}

export default App;