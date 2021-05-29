import React, { useState, useEffect, useRef } from "react";
import { Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';

import io from 'socket.io-client';

import * as BoardInit from '../utils/board.utils';
import Circle from '../components/circle.component';
import Pawn from '../components/pawns.component';
const ENDPOINT = "ws://localhost:3000/";

const socket = io(ENDPOINT);

const Room = () => {

    const [gameStart, setGameStart] = useState(false);
    const [pawns, setPawns] = useState(BoardInit.initPawns());
    const [movedPawn, setMovedPawn] = useState<{x: number, y: number, index: number | undefined}>({ x: 0, y: 0, index: undefined });

    const location = useLocation<{ roomId: string }>();
    const roomId = location.state.roomId;

    const boardSpot = BoardInit.createBoardSpot();
    const boardOutier = BoardInit.createBoardOutier();
    const scale = 1;

    useEffect(() => {
        socket.on('connect', () => {
        })
        socket.on('startGame', (Arraypawns: {x: number, y:number, team: string}[]) => {
            setGameStart(true);
            setPawns(Arraypawns);
        })
        socket.on('joinRoom', () => {
        })
        socket.on('movePawn', (Arraypawns: {x: number, y:number, team: string}[]) => {
            movePawn(Arraypawns);
        })
        socket.on('impossibleMove', () => {
            console.log('movement impossible')
        })
        socket.emit('joinRoom', { name: 'username', roomId: roomId })
    }, [socket])

    const launchGame = () => {
        socket.emit('startGame', { roomId: roomId })
    }

    const outierPoints = boardOutier.map(o => [o[0], o[1]])
        .reduce((x: any, y: any) => x + ' ' + y, '')

    const savePawn = (x: number, y: number, index: number) => {
        setMovedPawn({x: x, y: y, index: index});
    }

    const socketMovePawn = (x: number, y: number) => {
        socket.emit('movePawn', {
            sender: 'username', roomId: roomId,
            movement: { oldX: movedPawn.x, oldY: movedPawn.y, newX: x, newY: y }
        })
    }

    const movePawn = (Arraypawns: {x: number, y: number, team: string}[]) => {
        setPawns(Arraypawns);
    }

    return (
        <div>
            <div>Room</div>
            { gameStart
                ? <div>
                    <svg viewBox='-5 -5 75 75' style={{ background: 'white' }}>
                        <polygon points={outierPoints} stroke='black' strokeWidth='.5'
                            fill='transparent' strokeLinejoin="round" />
                        {boardSpot.map((points, index) =>
                            <Circle key={index} x={points[0]} y={points[1]} scale={scale}
                                onClick={() => { socketMovePawn(points[0], points[1]) }} />
                        )}
                        {pawns.map((pawn, index) =>
                            <Pawn key={index} x={pawn.x} y={pawn.y} team={pawn.team}
                                onClick={() => { savePawn(pawn.x, pawn.y, index) }} />
                        )}
                    </svg>
                </div>
                : <Button onClick={() => { launchGame() }} variant="success">Start the GAME</Button>
            }
        </div>
    )
}

export default Room