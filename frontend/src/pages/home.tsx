import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function Home() {

    const [roomId, setRoomId] = useState('');

    const history = useHistory()

    const createRoom = async () => {
        axios.post('http://localhost:3000/room')
        .then(response => {
            console.log(response)
            history.push({pathname: `/room/${response.data}`,
            state: {roomId: response.data}})
        })
    }

    const logout = () => {
        localStorage.removeItem('token')
        history.push({pathname: '/login'})
    }

    const joinRoom = () => {
        history.push({pathname: `/room/${roomId}`,
        state: {roomId: roomId}})
    }

    return (
        <div className="d-flex flex-column">
            <div className="d-flex justify-content-center align-items-center" style={{height: '13vh'}}>Home</div>
            <div className="d-flex justify-content-center align-items-center" style={{height: '28vh'}}>
                {localStorage.getItem('token')
                        ? <div>
                            <div><Button onClick={() => logout()} variant="outline-secondary">Logout</Button></div>
                            <div><Button onClick={() => history.push({pathname: '/profil'})} variant="outline-primary">Profil</Button></div>
                            <div><Button variant="primary" onClick={() => createRoom()}>Create Game room</Button></div>
                            <div className="d-flex justify-content-center align-items-center" style={{height: '20vh'}}>
                                <Form onSubmit={joinRoom}>
                                    <Form.Group controlId="formRoomId">
                                        <Form.Label>Room Link</Form.Label>
                                        <Form.Control value={roomId} onChange={(event) => {setRoomId(event.target.value)}} required placeholder="Enter Room Link"/>
                                    </Form.Group>
                                    <Button type="submit" variant="primary" onClick={() => joinRoom()}>Join Room</Button>
                                </Form>
                            </div>
                        </div>
                        : <p><Button onClick={() => history.push({pathname: '/login'})} variant="outline-primary">Login</Button></p>
                    }
            </div>
        </div>
    )
}

export default Home
