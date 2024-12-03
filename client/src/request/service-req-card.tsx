import { useState } from "react";
import { submitButtonStyle } from "../styles/button-syles";
import cardStyle from "../styles/card-styles";
import { serviceRequestResponse } from "./request-types";
import { inputStyle } from "../styles/form-styles";

interface LocalParams {
    serviceRequest: serviceRequestResponse,
    handleSubmit: (id: string, text: string) => void
}

export default function ServiceRequestCard ({serviceRequest, handleSubmit}: LocalParams) {
    const [inputSwitch, setInputSwitch] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");

    return <div className={cardStyle}>
        <div className="flex gap-1">
            <label className="text-xs font-semibold text-gray-700 mt-1">Запит від:</label>
            <label>{serviceRequest.requester.nickname}</label>
        </div>
        <div className="flex gap-1">
            <label className="text-xs font-semibold text-gray-700 mt-1">Обладнання:</label>
            <label>{serviceRequest.hardware.model}</label>
        </div>
        <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-700 mt-1">Опис проблеми:</label>
            <label>{serviceRequest.problem}</label>
        </div>
        <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-700 mt-1">Критичність:</label>
            <label>{serviceRequest.crit}</label>
        </div>
        <div className="flex justify-center mt-2">
            <button className={submitButtonStyle} type="button" onClick={() => setInputSwitch(!inputSwitch)}>{inputSwitch ? "згорнути" : "детальніше"}</button>
        </div>
        {inputSwitch && <div className="flex flex-col gap-2">
            <textarea placeholder="інформація про обслуговування" className={inputStyle} value={input} onChange={(e) => setInput(e.target.value)}/>
            <button className={submitButtonStyle} type="button" onClick={() => handleSubmit(serviceRequest._id, input)}>затвердити</button>
        </div>}
    </div>
}