import React from "react"
import { Modal } from "antd"

function Popup({ PopupModalOpen, setPopupModalOpen, gptData }) {

    const onClose = (event) => {
        event.stopPropagation()
        setPopupModalOpen(false);
    }

    return (
        <>
            < Modal title={< h3 className="tw-text-xl tw-font-medium" > Dr. Soham Mafidar here to help 🙂</h3 >}
                styles={{ wrapper: { zIndex: 24000, gap: "10px" }, content: { background: "linear-gradient(135deg, #5C4DA0, #897CCB)" }, header: { background: "linear-gradient(135deg, #5C4DA0, #897CCB)" } }}
                onCancel={onClose}
                onOk={onClose}
                footer={null}
                open={PopupModalOpen}>

                <div className="tw-mt-5 tw-text-lg tw-place-content-center tw-w-full tw-place-items-center">
                    {gptData === "Null" ? <p>I'm so sorry! But this question is beyond my knowledge. I guess you're on your own now 😬</p> :
                        <p>
                            {gptData}
                        </p>
                    }
                </div>

            </Modal >
        </>
    )

}

export default Popup