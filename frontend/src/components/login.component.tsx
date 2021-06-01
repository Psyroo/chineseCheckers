import { Button, Form, Card, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import React, { Component, useState } from 'react';

const LoginForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    const handleSubmit = (event: any) => {

        event.preventDefault();
        axios.post("http://localhost:3000/user/login", {
            user: {
                username,
                password
            }
        }).then(response => {
            console.log("registration res", response);
            localStorage.setItem(
                "token", response.data.user.token
            );
            localStorage.setItem(
                "username", username
            );
            localStorage.setItem(
                "id", response.data.user.id
            );
            console.log(response.data.user.id)
            history.push({ pathname: '/' })
        })
            .catch(error => {
                console.log("registration error", error);
            });
    }

    return (
        <div >
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '78vh' }}>
                <Row>
                    <Card style={{ width: '25rem' }}>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control value={username} onChange={(event) => setUsername(event.target.value)} required placeholder="Enter Username" />
                                </Form.Group>


                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>password</Form.Label>
                                    <Form.Control value={password} onChange={(event) => setPassword(event.target.value)} required type="password" placeholder="Enter your password" />
                                </Form.Group>

                                <div className="d-flex justify-content-center">
                                    <Button type="submit" variant="primary" style={{ width: "100%" }} >Login</Button>
                                </div>
                            </Form>
                            <div className="d-flex flex-column justify-content-center mt-10">
                                <p>Not member yet ?</p>
                                <Button variant="outline-secondary" style={{ width: "100%" }} onClick={() => {history.push('/register')}}>Register</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </div>
    )
}

export default LoginForm
