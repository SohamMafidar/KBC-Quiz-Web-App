import React from 'react'
import useSound from 'use-sound';
import correct from '../sounds/correct.mp3';
import wrong from '../sounds/wrong.mp3';
import play from '../sounds/play.mp3';
// import wait from '../sounds/wait.mp3';

function Trivia({ data, questionNumber, setQuestionNumber, setIsStop }) {

    const [question, setQuestion] = React.useState(null);
    const [selectedAnswer, setSelectedAnswer] = React.useState(null);
    const [className, setClassName] = React.useState('answer');
    const [letsPlay] = useSound(play);
    const [correctAnswerSound] = useSound(correct);
    const [wrongAnswerSound] = useSound(wrong);
    // const [waitT] = useSound(wait);

    React.useEffect(() => {
        letsPlay();
    }, [letsPlay])

    React.useEffect(() => {
        setQuestion(data[questionNumber - 1]);
    }, [data, questionNumber]);

    const delay = (duration, callback) => {
        setTimeout(() => {
            callback()
        }, duration)
    }

    const handleClick = (item) => {
        setSelectedAnswer(item);
        setClassName('answer active');
        delay(3000, () => setClassName(item.correct ? 'answer correct' : 'answer wrong'))
        delay(5000, () => {
            if (item.correct) {
                correctAnswerSound();
                delay(1000, () => {
                    setQuestionNumber(prev => prev + 1);
                    setSelectedAnswer(null);
                })
            }
            else {
                wrongAnswerSound();
                delay(1000, () => {
                    setIsStop(true);
                })
            }
        }
        )
    }

    return (
        <div className="trivia">
            <div className="question">
                {question?.question}
            </div>
            <div className='answers'>
                {question?.answers.map((item) => {
                    return (
                        <div className={selectedAnswer === item ? className : 'answer'} onClick={() => handleClick(item)}>{item.text}</div>
                    )
                })}
            </div>
        </div>
    )
}

export default Trivia