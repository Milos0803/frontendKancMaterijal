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
import CategoryPage from './components/CategoryPage/CategoryPage';
import UserLoginpage from './components/UserLoginPage/UserLoginPage';

const menuItems: MainMenuItem[] = [
  new MainMenuItem("Početna", "/"),
  new MainMenuItem("Contact", "/contact/"),
  new MainMenuItem("Prijava", "/user/login/"),
  new MainMenuItem("Category 1", "/category/1/"),
  new MainMenuItem("Category 22", "/category/22/"),
  new MainMenuItem("Category 31", "/category/31/"),
  new MainMenuItem("Category 4", "/category/4/"),
  
];





ReactDOM.render(
  <React.StrictMode>
    <MainMenu items= {menuItems}/>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={ HomePage } />
        <Route path="/contact" component={ ContactPage } />
        <Route path="/user/login" component={ UserLoginpage } />
        <Route path="/category/:cId" component={ CategoryPage } />
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
