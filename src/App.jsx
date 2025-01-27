import React from "react";
import Trivia from "./components/Trivia";
import StartGame from "./components/StartGame";
import Helpline from "./components/Helpline";
import Timer from "./components/Timer";
import { FidgetSpinner } from "react-loader-spinner";
import { arr } from "./moneyPyramid";

let data = [];
function App() {
    const [questionNumber, setQuestionNumber] = React.useState(1);
    const [isStop, setIsStop] = React.useState(false);
    const [earned, setEarned] = React.useState('₹0');
    const [loading, setLoading] = React.useState(true);
    const [isGameStart, setIsGameStart] = React.useState(false);
    const [isFiftyActive, setIsFiftyActive] = React.useState(false);
    const subscribed = React.useRef(false);

    const moneyPyramid = React.useMemo(
        () => arr,
        []
    );
    //* Pulls the data from api
    React.useEffect(() => {
        const pullData = async () => {
            setLoading(true);
            try {
                const resp = await fetch("https://kbc-backend.netlify.app/.netlify/functions/TriviaApi");
                if (!resp.ok) {
                    const errorData = await resp.json();
                    throw new Error(errorData.error || 'Unknown error occurred');
                }
                const respData = await resp.json();
                data = respData;
                setLoading(false);
                // data = await collectAllOptions(data);
            } catch (error) {
                console.log("Error calling Trivia api: ", error.message);
            }
        };
        if (!subscribed.current) {
            subscribed.current = true;
            pullData();
        }
        //? cleanup function
        return () => {
            data = [];
            subscribed.current = false;
        };
    }, []);

    //* calculates how much money is earned
    React.useEffect(() => {
        questionNumber > 1 && setEarned(moneyPyramid.find((item) => item.id === questionNumber - 1).amount)
    }, [questionNumber, moneyPyramid])

    if (loading && isGameStart) {
        return (
            <div className="loading-screen">
                <FidgetSpinner
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                    ballColors={["#ff0000", "#00ff00", "#0000ff"]}
                    backgroundColor="#F4442E"
                />
            </div>
        );
    }

    else {
        return (
            <div className="app">
                {isGameStart ? (
                    <>
                        <div className="main">
                            {(isStop || questionNumber > data.length) ? <h1 className="endText">You've earned {earned} </h1> :
                                <>
                                    <div className="top">
                                        <div className="timer">
                                            <Timer setIsStop={setIsStop} questionNumber={questionNumber} />
                                        </div>
                                    </div>
                                    <div className="bottom">
                                        <Trivia id={moneyPyramid[questionNumber - 1].uuid} data={data}
                                            questionNumber={questionNumber}
                                            setQuestionNumber={setQuestionNumber}
                                            setIsStop={setIsStop}
                                            isFiftyActive={isFiftyActive}
                                        />
                                    </div>
                                </>
                            }
                        </div>

                        <div className="pyramid">
                            <Helpline data={data} questionNumber={questionNumber} setIsFiftyActive={setIsFiftyActive} />
                            <ul className="moneyList">
                                {moneyPyramid.map((m) => {
                                    return (
                                        <li key={m.uuid
                                        } className={questionNumber === m.id ? 'moneyListItem active' : 'moneyListItem'}>
                                            <span className="moneyListItemNumber">{m.id}</span>
                                            <span className="moneyListItemAmount">{m.amount}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </>
                ) : <StartGame setIsGameStart={setIsGameStart} />}

            </div>
        );
    }


}

export default App;
