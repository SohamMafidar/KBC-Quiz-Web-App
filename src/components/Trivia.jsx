import React from 'react'
import useSound from 'use-sound';
import correct from '../sounds/correct.mp3';
import wrong from '../sounds/wrong.mp3';

function Trivia({ id, data, questionNumber, setQuestionNumber, setIsStop, isFiftyActive }) {

    const [question, setQuestion] = React.useState(null);
    const [selectedAnswer, setSelectedAnswer] = React.useState(null);
    const [className, setClassName] = React.useState('answer');
    const [correctAnswerSound] = useSound(correct);
    const [wrongAnswerSound] = useSound(wrong);
    const [updatedOptions, setUpdatedOptions] = React.useState([]);

    React.useEffect(() => {
        setQuestion(data[questionNumber - 1]);
    }, [data, questionNumber]);

    React.useEffect(() => {
        if (isFiftyActive && question) {
            setUpdatedOptions(() => {
                const correctAnswer = question.answers.find(option => option.correct);
                const wrongAnswers = question.answers.filter(option => !option.correct);
                const selectedWrongAnswer = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
                return [correctAnswer, selectedWrongAnswer].sort(() => 0.5 - Math.random());
            });
        }
    }, [isFiftyActive, question]);

    const delay = (duration, callback) => {
        setTimeout(() => {
            callback()
        }, duration)
    }

    const handleClick = (item) => {
        setSelectedAnswer(item);
        setClassName('answer active');
        delay(1000, () => setClassName(item.correct ? 'answer correct' : 'answer wrong'))
        delay(3000, () => {
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
                {updatedOptions.length > 0 ? updatedOptions.map((item, index) => (
                    <div key={id + index} className={selectedAnswer === item ? className : 'answer'} onClick={() => handleClick(item)}>{item.text}</div>
                )) :
                    question?.answers.map((item, index) => {
                        return (
                            <div key={id + index} className={selectedAnswer === item ? className : 'answer'} onClick={() => handleClick(item)}>{item.text}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Trivia