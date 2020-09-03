import React from 'react';
import {  Switch, Route, HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './components/HomePage/HomePage';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {MainMenu,MainMenuItem} from './components/MainMenu/MainMenu';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import ContactPage from './components/ContactPage/ContactPage';



const menuItems = [
new MainMenuItem("Home", "/"),
new MainMenuItem("Contact", "/contact/"),
new MainMenuItem("Login", "/user/login/")
];

ReactDOM.render(
  <React.StrictMode>
    <MainMenu items= {menuItems}/>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={ HomePage } />
        <Route path="/contact" component={ ContactPage } />
        <Route path="/user/login" component={ HomePage } />
        
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
