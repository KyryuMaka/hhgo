import React from 'react';
import './App.css';
import {Route, BrowserRouter} from 'react-router-dom';

import IndexPage from './pages/index';
import About from './pages/about';
import ContactPage from './pages/contact';

function App() {
    return (
      <BrowserRouter>
        {/* <Route exact path="/" component={IndexPage}/> */}
        <Route exact path="/" render={props => <IndexPage {...props} value="Trang chủ" />} />
        <Route exact path="/home" render={props => <IndexPage {...props} value="Trang chủ" />} />
        <Route exact path="/about" render={props => <About {...props} value="Về chúng tôi" />} />
        <Route exact path="/contact" render={props => <ContactPage {...props} value="Liên hệ" />}/>
      </BrowserRouter>
    );
}

export default App;