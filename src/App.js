import React from 'react';
import bootstrap from 'bootstrap';
import './App.css';
import {Route, BrowserRouter, Switch} from 'react-router-dom';

import SideBar from './components/BS-SideBar'

import LoginPage from './pages/login';
import IndexPage from './pages/index';
import HistoryPage from './pages/history';
import UserPage from './pages/user';
import Vehicles from './pages/vehicles';
// import ContactPage from './pages/contact';

import NotFound from './pages/notfound';

function App() {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact path="/" component={IndexPage}/> */}
        {isAuthenticated ?
          <div className="d-flex">
            <SideBar />
            <Route exact path="/" render={props => <IndexPage {...props} title="Trang chủ" />} />
            <Route exact path="/home" render={props => <IndexPage {...props} title="Trang chủ" />} />
            <Route exact path="/history" render={props => <HistoryPage {...props} title="Lịch sử"/>} />
            <Route exact path="/users" render={props => <UserPage {...props} title="Người dùng"/>} />
            <Route exact path="/vehicles" render={props => <Vehicles {...props} title="Xe"/>} />
          </div>
          :
          <Route exact path="/" render={props => <LoginPage {...props} title="Đăng nhập" />} />
        }
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;