import { Button, Form, Card, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import React, { Component } from 'react';

class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        }
    }

    setUsername = (event) => {
        this.setState({ username: event.target.value });
    }

    setPassword = (event) => {
        this.setState({ password: event.target.value });
    }

    handleSubmit = (event) => {
        const {
            username,
            password,
        } = this.state;

        axios.post("http://localhost:3000/User/", {
            user : {
                username: username,
                password: password
            }
        }
        )
        .then(response => {
            console.log(response)
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
                                        <Form.Control value={this.state.username} onChange={this.setUsername} required placeholder="Enter Username"/>
                                    </Form.Group>


                                    <Form.Group controlId="formBasicPassword">
                                    <Form.Label>password</Form.Label>
                                    <Form.Control value={this.state.password} onChange={this.setPassword} required type="password" placeholder="Enter your password"/>
                                    </Form.Group>

                                    <div className="d-flex justify-content-center">
                                        <Button type="submit" variant="primary" style={{width: "100%" }} >Submit</Button>{' '}
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

export default RegisterForm