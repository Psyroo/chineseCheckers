import axios from 'axios';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function Home() {

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

    return (
        <div>
            <div>Welcome</div>
            <div>
                {localStorage.getItem('token')
                        ? <p><Button variant="primary" onClick={() => createRoom()}>Create Game room</Button><br /><Button onClick={() => logout()} variant="outline-secondary">Logout</Button></p>
                        : <p><Button onClick={() => history.push({pathname: '/login'})} variant="outline-primary">Login</Button></p>
                    }
            </div>
        </div>
    )
}

export default Home
