import React from "react";
import useSound from 'use-sound';
import wrong from '../sounds/wrong.mp3';

export default function Timer({ setIsStop, questionNumber }) {

    const [timer, setTimer] = React.useState(30);
    const [wrongAnswerSound] = useSound(wrong);
    React.useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => {
                return prev - 1;
            })
            if (timer === 0) {
                setIsStop(true);
                wrongAnswerSound();
            }
        }, 1000)
        return () => clearInterval(interval);
    }, [timer, setIsStop, wrongAnswerSound])

    React.useEffect(() => {
        setTimer(30);
    }, [questionNumber])

    return timer;
}