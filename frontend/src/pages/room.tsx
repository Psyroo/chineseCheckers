import React, { useState, useEffect, useRef } from "react";
import { Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import io  from 'socket.io-client';
import Board from "../components/board.component";
const ENDPOINT = "ws://localhost:3000/";

const socket = io(ENDPOINT);

const Room = () => {
    
    const location = useLocation<{roomId: string}>()
    const roomId = location.state.roomId
    const [gameStart, setGameStart] = useState(false);
    const [response, setResponse] = useState("");

    useEffect(() => {
        socket.on('connect', () => {
            console.log('oiejfzoj')
        })
        socket.on('startGame', () => {
            setGameStart(true)
        })
        socket.on('joinRoom', () => {
            console.log('room joined');
        })
        socket.emit('joinRoom', {name: 'username', roomId: roomId})
    }, [socket])
    
    const launchGame = () => {
        console.log(roomId);
        socket.emit('startGame', {roomId: roomId})
    }

    return (
        <div>
            <div>Room</div>
            { gameStart 
                ? <Board />
                : <Button onClick={() => {launchGame()}}variant="success">Start the GAME</Button>
            }
        </div>
    )
}

export default Room