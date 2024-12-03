import { useState } from "react";
import { submitButtonStyle } from "../styles/button-syles";
import cardStyle from "../styles/card-styles";
import { modificationRequestResponse } from "./request-types";
import { inputStyle } from "../styles/form-styles";

interface LocalParams {
    modificationRequest: modificationRequestResponse,
    handleSubmit: (id: string, text: string) => void
}

export default function ModificationRequestCard ({modificationRequest, handleSubmit}: LocalParams) {
    const [inputSwitch, setInputSwitch] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");

    return <div className={cardStyle}>
    <div className="flex gap-1">
        <label className="text-xs text-gray-700 font-semibold mt-1">Запит від:</label>
        <label>{modificationRequest.requester.nickname}</label>
    </div>
    <div className="flex gap-1">
        <label className="text-xs font-semibold text-gray-700 mt-1">Обладнання:</label>
        <label>{modificationRequest.hardware.model}</label>
    </div>
    <div className="flex gap-1">
        <label className="text-xs font-semibold text-gray-700 mt-1">Причина:</label>
        <label>{modificationRequest.reason}</label>
    </div>
    <div>
        <label className="text-xs font-semibold text-gray-700 mt-1">Бажані характеристики:</label>
        <label>{modificationRequest.chars}</label>
    </div>
    <div>
        <label className="text-xs font-semibold text-gray-700 mt-1">Критичність:</label>
        <label>{modificationRequest.crit}</label>
    </div>
    <div className="flex justify-center mt-2">
        <button className={submitButtonStyle} type="button" onClick={() => setInputSwitch(!inputSwitch)}>{inputSwitch ? "згорнути" : "детальніше"}</button>
    </div>
    {inputSwitch && <div className="flex flex-col gap-2">
            <textarea placeholder="рекомендації до модернізації" className={inputStyle} value={input} onChange={(e) => setInput(e.target.value)}/>
            <button className={submitButtonStyle} type="button" onClick={() => handleSubmit(modificationRequest._id, input)}>затвердити</button>
        </div>}
</div>
}