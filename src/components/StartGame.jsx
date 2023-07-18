import React from 'react'

function StartGame({ setIsGameStart }) {

    const startGame = () => {
        setIsGameStart(prevState => {
            return !prevState
        });
    }

    return (
        <div className="start">
            <h1>
                Click to start the game
            </h1>
            <button onClick={startGame}>Let's play</button>
        </div>
    )
}

export default StartGame