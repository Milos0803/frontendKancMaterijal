import React from 'react';
import {Container} from 'react-bootstrap';
import 'jquery/dist/jquery.js';
import 'popper.js/dist/popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import {faHome} from '@fortawesome/free-solid-svg-icons';
function App() {
  return (
    <Container >
      <FontAwesomeIcon icon= {faHome} />
      Home
    </Container>
  );
}

export default App;
