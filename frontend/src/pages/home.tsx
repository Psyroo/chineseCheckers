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

    const joinRoom = () => {
        history.push({pathname: `/room/${roomId}`,
        state: {roomId: roomId}})
    }

    return (
        <div>
            <div>Welcome</div>
            <Button variant="primary" onClick={() => createRoom()}>Create Game room</Button>
            <Form onSubmit={joinRoom}>
                <Form.Group controlId="formRoomId">
                    <Form.Label>Room Link</Form.Label>
                    <Form.Control value={roomId} onChange={(event) => {setRoomId(event.target.value)}} required placeholder="Enter Room Link"/>
                </Form.Group>
            <Button type="submit" variant="primary" onClick={() => joinRoom()}>Join Room</Button>
            </Form>
        </div>
    )
}

export default Home