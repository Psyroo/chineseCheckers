import React from 'react';

const Pawn = ({scale = 1, x = 0, y = 0, team = "black", onClick = () =>{}}) => {
    const r = Math.sqrt(3);

    return (
        <circle
            cx={`calc(0 + ${x*scale})`}
            cy={`calc(0 + ${y*r*scale})`}
            r={`${.8 * scale}`}
            fill={`${team}`}
            onClick={onClick}
        />
    )
}

export default Pawn;
