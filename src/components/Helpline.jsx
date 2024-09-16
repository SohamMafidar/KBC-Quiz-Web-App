import React from 'react'
import Popup from "./Popup";
export default function Helpline({ data, questionNumber, setIsFiftyActive }) {
    const [PopupModalOpen, setPopupModalOpen] = React.useState(false)
    const [gptData, setGptData] = React.useState("");
    const [isExpertButtonDisabled, setIsExpertButtonDisabled] = React.useState(false); // State for button disabled
    const [isFiftyButtonDisabled, setIsFiftyButtonDisabled] = React.useState(false);
    // const [isFetchingError, setIsFetchingError] = React.useState(false);


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
            setGptData("")
            const response = await fetch("/.netlify/functions/openAI", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contentObj),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setGptData("Null");
                throw new Error(errorData.error || 'Unknown error occurred');
            }
            const respData = await response.json();
            setGptData(respData);

        } catch (error) {
            console.log("Error fetching results: ", error)
            setGptData("Null");
        }
        finally {
            setPopupModalOpen(true);
            setIsExpertButtonDisabled(true);
        }

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

