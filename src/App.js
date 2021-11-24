import React from 'react';
import bootstrap from 'bootstrap';
import './App.css';
import {Route, BrowserRouter} from 'react-router-dom';

import LoginPage from './pages/login';
import IndexPage from './pages/index';
import AboutPage from './pages/about';
import ContactPage from './pages/contact';

function App() {
  return (
    <BrowserRouter>
      {/* <Route exact path="/" component={IndexPage}/> */}
      <Route exact path="/" render={props => <LoginPage {...props} value="Đăng nhập" />} />
      <Route exact path="/home" render={props => <IndexPage {...props} value="Trang chủ" />} />
      <Route exact path="/about" render={props => <AboutPage {...props} value="Về chúng tôi" />} />
      <Route exact path="/contact" render={props => <ContactPage {...props} value="Liên hệ" />}/>
    </BrowserRouter>
  );
}

export default App;