import { Button, Form, Card, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';

const RegisterForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()


    const handleSubmit = (event: any) => {
        event.preventDefault();

        axios.post("http://localhost:3000/User", {
            user: {
                username,
                password
            }
        })
            .then(response => {
                history.push('/login')
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
                                    <Button type="submit" variant="primary" style={{ width: "100%" }} >Submit</Button>{' '}
                                </div>
                            </Form>
                            <div className="d-flex flex-column justify-content-center mt-10">
                                <p>Already registered ?</p>
                                <Button variant="outline-secondary" style={{ width: "100%" }} onClick={() => { history.push('/login') }}>Login</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </div>
    );
}

export default RegisterForm