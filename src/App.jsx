import React from "react";
import Trivia from "./components/Trivia";
import { FidgetSpinner } from "react-loader-spinner";
import { collectAllOptions } from "./Helper";

let data = [];
function App() {
    const [questionNumber, setQuestionNumber] = React.useState(1);
    const [isStop, setIsStop] = React.useState(false);
    const [earned, setEarned] = React.useState('₹0');
    const [loading, setLoading] = React.useState(true);
    const subscribed = React.useRef(false);
    const moneyPyramid = React.useMemo(
        () =>
            [
                { id: 1, amount: "₹ 1,00,000" },
                { id: 2, amount: "₹ 10,00,000" },
                { id: 3, amount: "₹ 25,00,000" },
                { id: 4, amount: "₹ 50,00,000" },
                { id: 5, amount: "₹ 1,00,00,000" },

            ].reverse(),
        []
    );

    React.useEffect(() => {
        const pullData = async () => {
            setLoading(true);
            try {
                const resp = await fetch(
                    "https://the-trivia-api.com/api/questions?categories=general_knowledge&limit=5&difficulty=easy"
                );
                const respData = await resp.json();
                data = respData;
                setLoading(false);
                data = await collectAllOptions(data);
                console.log(data);
            } catch (error) {
                console.log(error.message);
            }
        };
        if (!subscribed.current) {
            subscribed.current = true;
            pullData();
        }
        //?cleanup function
        return () => {
            data = [];
            subscribed.current = false;
        };
    }, []);


    React.useEffect(() => {
        questionNumber > 1 && setEarned(moneyPyramid.find((item) => item.id === questionNumber - 1).amount)
    }, [questionNumber, moneyPyramid])
    console.log(data);
    if (loading) {
        return (
            <>
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
            </>
        );
    }

    else {
        return (
            <div className="app">
                <div className="main">
                    {(isStop || questionNumber >= data.length) ? <h1 className="endText">You've earned {earned} </h1> :
                        <>
                            <div className="top"></div>
                            <div className="bottom">
                                <Trivia data={data}
                                    questionNumber={questionNumber}
                                    setQuestionNumber={setQuestionNumber}
                                    setIsStop={setIsStop} />
                            </div>
                        </>
                    }
                </div>
                <div className="pyramid">
                    <ul className="moneyList">
                        {moneyPyramid.map((m) => {
                            return (
                                <li className={questionNumber === m.id ? 'moneyListItem active' : 'moneyListItem'}>
                                    <span className="moneyListItemNumber">{m.id}</span>
                                    <span className="moneyListItemAmount">{m.amount}</span>
                                </li>
                            )
                        })}


                    </ul>
                </div>

            </div>
        );
    }


}

export default App;
