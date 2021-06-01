import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function Home() {

    const [roomId, setRoomId] = useState('');

    const history = useHistory()

    const createRoom = async () => {
        axios.post('http://localhost:3000/room')
            .then(response => {
                console.log(response)
                history.push({
                    pathname: `/room/${response.data}`,
                    state: { roomId: response.data }
                })
            })
    }

    const logout = () => {
        localStorage.removeItem('token')
        history.push({ pathname: '/login' })
    }

    const joinRoom = () => {
        history.push({
            pathname: `/room/${roomId}`,
            state: { roomId: roomId }
        })
    }

    return (
        <div className="d-flex flex-column justify-content-around">
            <div className="d-flex justify-content-center align-items-center"><h1>Home</h1></div>
            {localStorage.getItem('token')
                ? <div className="d-flex flex-column align-items-center justify-content-around">
                    <div className="d-flex justify-content-around">
                        <Button onClick={() => logout()} variant="outline-secondary">Logout</Button>
                        <Button onClick={() => history.push({ pathname: '/profil' })} variant="outline-primary">Profil</Button>
                    </div>
                    <Card style={{ width: '25rem' }}>
                        <Card.Body>
                        <div className="d-flex justify-content-center align-items-center">
                            <Button variant="primary" onClick={() => createRoom()}>Create Game room</Button>
                            <div className="d-flex justify-content-center align-items-center" style={{ width: '100%' }}>
                                <Form onSubmit={joinRoom}>
                                    <Form.Group controlId="formRoomId">
                                        <Form.Label>Room Link</Form.Label>
                                        <Form.Control value={roomId} onChange={(event) => { setRoomId(event.target.value) }} required placeholder="Enter Room Link" />
                                    </Form.Group>
                                    <Button type="submit" variant="primary" onClick={() => joinRoom()}>Join Room</Button>
                                </Form>
                            </div>
                        </div>
                        </Card.Body>
                    </Card>
                </div>
                : <div>
                    <Button onClick={() => history.push({ pathname: '/login' })} variant="outline-primary">Login</Button>
                    <Button onClick={() => history.push({ pathname: '/register' })} variant="outline-primary">Register</Button>
                </div>
            }
        </div>
    )
}

export default Home
