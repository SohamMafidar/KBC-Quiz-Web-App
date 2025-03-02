import React, { useState, useMemo, useEffect } from "react";
import Trivia from "./components/Trivia";
import StartGame from "./components/StartGame";
import Helpline from "./components/Helpline";
import Timer from "./components/Timer";
import { FidgetSpinner } from "react-loader-spinner";
import { arr } from "./moneyPyramid";
import useTriviaData from "./useTriviaData";
import useDeviceCheck from "./useDeviceCheck";
import NoSmallScreen from "./components/NoSmallScreen";

function App() {
    const [questionNumber, setQuestionNumber] = useState(1);
    const [isStop, setIsStop] = useState(false);
    const [earned, setEarned] = useState("₹0");
    const [isGameStart, setIsGameStart] = useState(false);
    const [isFiftyActive, setIsFiftyActive] = useState(false);

    const moneyPyramid = useMemo(() => arr, []);
    const isDesktop = useDeviceCheck();
    const { loading, data } = useTriviaData();

    useEffect(() => {
        if (questionNumber > 1) {
            setEarned(moneyPyramid.find((item) => item.id === questionNumber - 1)?.amount || "₹0");
        }
    }, [questionNumber, moneyPyramid]);

    if (!isDesktop) return <NoSmallScreen />;

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

export default App;
