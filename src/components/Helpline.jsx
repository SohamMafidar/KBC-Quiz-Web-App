import React from 'react'
import OpenAI from "openai";
export default function Helpline({ data, questionNumber, setIsFiftyActive }) {
    //? Free API key
    const openai = new OpenAI({
        apiKey: process.env.REACT_APP_API_KEY,
        baseURL: process.env.REACT_APP_BASE_URL,
        dangerouslyAllowBrowser: true
    });
    const [expertAnswer, setExpertAnswer] = React.useState(false);
    const [gptData, setGptData] = React.useState([]);

    //! Always frame content saying "in not more than 10 words"
    const expertClickHandler = async (event) => {
        //* Constructing object that would have all answer options and question to be sent to GPT
        let ansOptions = "";
        data[questionNumber - 1].answers.map((item) => {
            return ansOptions += item.text + ",";
        })
        let contentObj = {
            ansOptions,
            question: data[questionNumber - 1].question
        }
        console.log(contentObj);
        try {
            const completion = await openai.chat.completions.create({
                model: "pai-001",
                messages: [
                    { role: "system", content: "You are an expert in trivia and general knowledge and are an assistant in a quiz show helping users when they are in need" },
                    {
                        role: "user",
                        content: contentObj,
                    },
                ],
            });
            setGptData(completion.choices[0].message.content);
            console.log(gptData);
            setExpertAnswer(true);
            event.currentTarget.disabled = true;
        } catch (error) {
            setGptData("Null");
            setExpertAnswer(true);
            console.log("Error fetching results")
        }
    }

    const fiftyClickHandler = (event) => {
        event.currentTarget.disabled = true;
        setIsFiftyActive(true);
    }
    return (
        expertAnswer ?
            <div>
                {gptData !== "Null" ? <p>{gptData}</p> :
                    //* When we have error from gpt response
                    <h1>Incredible 🤯 Our game expert couldn't answer your question!!</h1>
                }
            </div> :
            //* Expert answer state === false meaning modal is not open */
            <div className="helpline">
                <button className="game-btn" id="fifty-fifty" onClick={fiftyClickHandler}>
                    Fifty Fifty
                </button>
                <button className="game-btn" id="ask-the-expert" onClick={expertClickHandler}>
                    Ask the expert
                </button>
            </div>

    )
}

