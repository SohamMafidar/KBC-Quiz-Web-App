import React from 'react'
import useSound from 'use-sound';
import play from '../sounds/play.mp3';

function StartGame({ setIsGameStart }) {

    const [letsPlay] = useSound(play, { preload: true });
    const startGame = () => {
        setIsGameStart(prevState => {
            return !prevState
        });
        letsPlay();
    }

    return (
        <div className="start">
            <h1>
                Click to start the game
            </h1>
            <button onClick={startGame} className='game-btn'>Let's play</button>
        </div>
    )
}

export default StartGame