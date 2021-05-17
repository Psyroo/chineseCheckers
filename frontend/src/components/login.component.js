import { Button, Form, Card, Container, Row } from 'react-bootstrap';
import { axios } from 'axios';
import React, { Component } from 'react';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        const {
            username,
            password
        } = this.state;

        axios.post("http://localhost:3000/User/login/", {
            user: {
                username: username,
                password: password
            }
        },
        { withCredentials: true }
        ).then(response => {
            console.log("registration res", response);
        })
        .catch(error => {
            console.log("registration error", error);
        });
        event.preventDefault();
    }

    render() {
        return (
            <div >
                <Container className="d-flex justify-content-center align-items-center" style={{height: '78vh'}}>
                    <Row>
                        <Card style={{ width: '25rem' }}>
                            <Card.Body>
                                <Form onSubmit={this.handleSubmit}>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control placeholder="Enter Username"/>
                                    </Form.Group>


                                    <Form.Group controlId="formBasicPassword">
                                    <Form.Label>password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter your password"/>
                                    </Form.Group>

                                    <div className="d-flex justify-content-center">
                                        <Button variant="primary" style={{width: "100%" }} >Login</Button>{' '}
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default LoginForm