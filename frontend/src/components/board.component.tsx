import React, { useState } from 'react';
import { render } from 'react-dom'
import logo from './logo.svg';
import Circle from './Circle';
import Pawn from './Pawns';

function Board() {

    let [pawns, setPawns] = useState(
        [
          {x: 13, y: 1, team: "red"}, {x: 12, y: 2, team: "red"}, {x: 14, y: 2, team: "red"},
          {x: 11, y: 3, team: "red"}, {x: 13, y: 3, team: "red"}, {x: 15, y: 3, team: "red"},
          {x: 10, y: 4, team: "red"}, {x: 12, y: 4, team: "red"}, {x: 14, y: 4, team: "red"},
          {x: 16, y: 4, team: "red"}
        ]
      );

      const r = Math.sqrt(3);
      const scale = 1;
      let movedPawn: {x: number, y: number, index: number | undefined} = {x: 0, y: 0, index: undefined};

      const spots = [
        [13, 1], [12, 2], [14, 2], [11, 3], [13, 3], [15, 3], [10, 4], [12, 4], [14, 4], [16, 4],
        [1, 5], [3, 5], [5, 5], [7, 5], [9, 5], [11, 5], [13, 5], [15, 5], [17, 5], [19, 5], [21, 5],
        [23, 5], [25, 5], [2, 6], [4, 6], [6, 6], [8, 6], [10, 6], [12, 6], [14, 6], [16, 6], [18, 6],
        [20, 6], [22, 6], [24, 6], [3, 7], [5, 7], [7, 7], [9, 7], [11, 7], [13, 7], [15, 7], [17, 7],
        [19, 7], [21, 7], [23, 7], [4, 8], [6, 8], [8, 8], [10, 8], [12, 8], [14, 8], [16, 8], [18, 8],
        [20, 8], [22, 8], [5, 9], [7, 9], [9, 9], [11, 9], [13, 9], [15, 9], [17, 9], [19, 9], [21, 9],
        [4, 10], [6, 10], [8, 10], [10, 10], [12, 10], [14, 10], [16, 10], [18, 10], [20, 10], [22, 10],
        [3, 11], [5, 11], [7, 11], [9, 11], [11, 11], [13, 11], [15, 11], [17, 11], [19, 11], [21, 11],
        [23, 11], [2, 12], [4, 12], [6, 12], [8, 12], [10, 12], [12, 12], [14, 12], [16, 12], [18, 12],
        [20, 12],[22, 12], [24, 12], [1, 13], [3, 13], [5, 13], [7, 13], [9, 13], [11, 13], [13, 13],
        [15, 13], [17, 13], [19, 13], [21, 13], [23, 13], [25, 13], [10, 14], [12, 14], [14, 14],
        [16, 14], [11, 15], [13, 15], [15, 15], [12, 16], [14, 16], [13, 17]
      ]

      const outier = [
        [13, 17 * r + 2.6],
        [17 + .8, 13 * r + 1.4],
        [25 + 2.4, 13 * r + 1.4],
        [21 + 1.6, 9 * r],
        [25 + 2.4, 5 * r - 1.4],
        [17 + .8, 5 * r - 1.4],
        [13, 1 * r - 2.6],
        [9 - .8, 5 * r - 1.4],
        [1 - 2.4, 5 * r - 1.4],
        [5 - 1.6, 9* r],
        [1 - 2.4, 13 * r + 1.4],
        [9 - 1, 13 * r + 1.4],
      ]

      const outierPoints = outier.map(o => [o[0], o[1]])
        .reduce((x: any, y: any) => x + ' ' + y, '')

      const savePawn = (x: number, y: number, index: number) => {
        movedPawn.x = x;
        movedPawn.y = y;
        movedPawn.index = index;
      }

      const movePawn = (x: number, y: number) => {
        let updatedList = pawns.map((pawn, index) => {
          if (index === undefined)
            return pawn;
          if (index === movedPawn.index) {
            return {...pawn, x: x, y: y};
          } else {
            return pawn;
          }
        })
        setPawns(updatedList);
        movedPawn.x = 0;
        movedPawn.y = 0;
        movedPawn.index = undefined;
      }

      return (
        <div>
          <svg viewBox= '-5 -5 75 75' style={{background:'white'}}>
            <polygon points={outierPoints} stroke='black' strokeWidth='.5'
            fill='transparent' strokeLinejoin="round" />
            {spots.map((points, index) =>
              <Circle key ={index} x={points[0]} y={points[1]} scale={scale}
              onClick={() => {movePawn(points[0], points[1])}} />
            )}
            {pawns.map((pawn, index) =>
              <Pawn key={index} x={pawn.x} y={pawn.y} team={pawn.team}
              onClick={() => {savePawn(pawn.x, pawn.y, index)}}/>
            )}
          </svg>
        </div>
      );
    }

export default Board;