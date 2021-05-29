import { Button, Card, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const Profil = () => {

    const history = useHistory()
    const [data, setData] = useState<{wins: number, losses: number, winstreak: number}>({wins: 0, losses: 0, winstreak: 0})

   useEffect(() => {
       axios.get('http://localhost:3000/user')
       .then(res => {
        const wins = res.data.wins
        const losses = res.data.loses
        const winstreak = res.data.winstreak
       })
   })

    return(
        <div>
            <Container className="d-flex justify-content-center align-items-center" style={{height: '78vh'}}>
                <Row>
                    <Card style={{ width: '25rem' }}>
                        <Card.Body>
                            <div>Username: {localStorage.getItem('username')}</div>
                            <div>Game wins: {data?.wins}</div>
                            <div>Game winstreak: {data?.winstreak}</div>
                            <div>Game loses: {data?.losses}</div>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </div>
    )
}

export default Profil
