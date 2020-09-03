import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faSignInAlt } from '@fortawesome/free-solid-svg-icons';
export default class UserLoginpage extends React.Component {
    render() {
        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <FontAwesomeIcon icon={faSignInAlt} /> User Login
                        </Card.Title>
                        <Card.Text>Formular</Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}