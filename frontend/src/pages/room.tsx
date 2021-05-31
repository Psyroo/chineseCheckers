import React, { useState, useEffect } from "react";
import { Button, Col, Row } from 'react-bootstrap';
import { FaRegCopy } from 'react-icons/fa';
import { useHistory, useLocation } from 'react-router-dom';

import io from 'socket.io-client';

import * as BoardInit from '../utils/board.utils';
import Circle from '../components/circle.component';
import Pawn from '../components/pawns.component';
import axios from "axios";
const ENDPOINT = "ws://localhost:3000/";

const socket = io(ENDPOINT);

const Room = () => {

    const history = useHistory();

    const [gameStart, setGameStart] = useState(false);
    const [pawns, setPawns] = useState(BoardInit.initPawns());
    const [movedPawn, setMovedPawn] = useState<{ x: number, y: number, index: number | undefined }>({ x: 0, y: 0, index: undefined });
    const [players, setPlayers] = useState(['']);
    const [team, setTeam] = useState('black');
    const [playingTeam, setPlayingTeam] = useState('black');
    const [gameEnd, setGameEnd] = useState(false);
    const [winner, setWinner] = useState('black');

    const location = useLocation<{ roomId: string }>();
    const roomId = location.state.roomId;

    const boardSpot = BoardInit.createBoardSpot();
    const boardOutier = BoardInit.createBoardOutier();
    const scale = 1;

    useEffect(() => {
        socket.on('connect', () => {
        })
        socket.on('startGame', (Arraypawns: { x: number, y: number, team: string }[], turn: string) => {
            setGameStart(true);
            setPawns(Arraypawns);
            setPlayingTeam(turn);
        })
        socket.on('joinRoom', (data: { roomId: string, team: string }) => {
            setTeam(data.team);
        })
        socket.on('movePawn', (Arraypawns: { x: number, y: number, team: string }[], turn: string) => {
            setPlayingTeam(turn);
            movePawn(Arraypawns);
        })
        socket.on('wrongMove', () => {
            console.log('movement impossible');
        })
        socket.on('newPlayer', (player: Array<string>) => {
            setPlayers(player);
        })
        socket.on('gameEnd', (winner: string) => {
            endGame(winner);
        })
        socket.emit('joinRoom', { name: localStorage.getItem('username'), roomId: roomId })
    }, [socket]);


    const launchGame = () => {
        setGameEnd(false);
        socket.emit('startGame', { roomId: roomId });
    }

    const outierPoints = boardOutier.map(o => [o[0], o[1]])
        .reduce((x: any, y: any) => x + ' ' + y, '');

    const savePawn = (x: number, y: number, index: number) => {
        setMovedPawn({ x: x, y: y, index: index });
    }

    const socketMovePawn = (x: number, y: number) => {
        if (movedPawn.index !== undefined) {
            socket.emit('movePawn', {
                sender: 'username', roomId: roomId,
                movement: { oldX: movedPawn.x, oldY: movedPawn.y, newX: x, newY: y },
                team: team
            });
            setMovedPawn({x: 0, y: 0, index: undefined});
        }
    }

    const movePawn = (Arraypawns: { x: number, y: number, team: string }[]) => {
        setPawns(Arraypawns);
    }

    const endGame = (winner: string) => {
        setWinner(winner);
        console.log(winner, team);
        if (winner === team) {
            axios.put(`http://localhost:3000/user/${localStorage.getItem('id')}`,
            {
                user: {
                    wins: 1,
                    loses: 0
                }
            });
        } else {
            axios.put(`http://localhost:3000/user/${localStorage.getItem('id')}`,
            {
                user: {
                    wins: 0,
                    loses: 1
                }
            });
        }
        setGameEnd(true);
    }

    return (
        <div>
            <div>
                <ul>
                    {players.map((player) =>
                        <li>{player}</li>
                    )}
                </ul>
            </div>
            <div>
                {gameEnd
                    ? <div>
                        <h1>The winner is {winner}</h1>
                        <Button onClick={() => { launchGame() }} variant="success">Restart the game</Button>
                        <Button onClick={() => history.push({pathname: '/'})} variant="success">Home</Button>
                    </div>
                    : <div>{gameStart
                        ? <div>
                            <h3 style={{ color: `${team}` }}>You are {team}</h3>
                            <h1 style={{ color: `${playingTeam}` }}>turn: {playingTeam}</h1>
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
                        : <div>
                            <Row className='align-items-center'>
                                <Col sm={4} className="my-1">
                                    <span style={{ padding: '10px', border: 'solid grey' }}>{roomId}</span>
                                </Col>
                                <Col sm={0} className="my-1">
                                    <Button onClick={() => { navigator.clipboard.writeText(roomId) }}><FaRegCopy /></Button>
                                </Col>
                            </Row>
                            {players.length >= 2
                                ? <Button onClick={() => { launchGame() }} variant="success">Start the GAME</Button>
                                : <p>Waiting for players</p>
                            }
                        </div>
                    }</div>
                }
            </div>
        </div>
    )
}

export default Room