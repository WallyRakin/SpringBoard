import React, { useState } from 'react';
import './EightBall.css'; // Import the CSS file

function EightBall({ answers }) {
    const [current, setCurrent] = useState({ msg: "Think of a Question", color: "black" });

    const getRandomAnswer = () => {
        const randomIndex = Math.floor(Math.random() * answers.length);
        return answers[randomIndex];
    };

    const handleClick = () => {
        const randomAnswer = getRandomAnswer();
        setCurrent(randomAnswer);
    };


    return (
        <div className='eightBall' onClick={handleClick} style={{ backgroundColor: current.color }}>
            <p>{current.msg}</p>
        </div>
    );
}

export default EightBall;
