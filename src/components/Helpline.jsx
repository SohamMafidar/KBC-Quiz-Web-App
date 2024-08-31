import React from 'react'
import OpenAI from "openai";
import Popup from "./Popup";
export default function Helpline({ data, questionNumber, setIsFiftyActive }) {
    //? Free API key
    const openai = new OpenAI({
        apiKey: process.env.REACT_APP_API_KEY,
        baseURL: process.env.REACT_APP_BASE_URL,
        dangerouslyAllowBrowser: true
    });
    const [PopupModalOpen, setPopupModalOpen] = React.useState(false)
    const [gptData, setGptData] = React.useState([]);
    const [isExpertButtonDisabled, setIsExpertButtonDisabled] = React.useState(false); // State for button disabled
    const [isFiftyButtonDisabled, setIsFiftyButtonDisabled] = React.useState(false);
    //! Always frame content saying "in not more than 10 words"
    const expertClickHandler = async () => {
        //* Constructing object that would have all answer options and question to be sent to GPT
        let ansOptions = "";
        data[questionNumber - 1].answers.map((item) => {
            return ansOptions += item.text + ",";
        })
        let contentObj = {
            ansOptions,
            question: data[questionNumber - 1].question
        }
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
        } catch (error) {
            setGptData("Null");
            console.log("Error fetching results")
        }
        setPopupModalOpen(true);
        setIsExpertButtonDisabled(true);
    }

    const fiftyClickHandler = (event) => {
        setIsFiftyButtonDisabled(true);
        setIsFiftyActive(true);
    }

    return (
        PopupModalOpen ?
            <div>
                <Popup PopupModalOpen={PopupModalOpen} setPopupModalOpen={setPopupModalOpen} gptData={gptData} />
            </div> :
            //* Expert answer state === false meaning modal is not open */
            <div className="helpline">
                <button className="game-btn" id="fifty-fifty" onClick={fiftyClickHandler} disabled={isFiftyButtonDisabled}>
                    Fifty Fifty
                </button>
                <button className="game-btn" id="ask-the-expert" onClick={expertClickHandler} disabled={isExpertButtonDisabled}>
                    Ask the expert
                </button>
            </div>

    )
}

