import { useNavigate } from "react-router-dom";
import { HardwareResponse } from "./hardware-types";
import { submitButtonStyle } from "../styles/button-syles";
import { ReactNode } from "react";
import { inputStyle } from "../styles/form-styles";

interface LocalParams {
    hardwareData: HardwareResponse,
    bottomDiv: ReactNode
}

function HardwareRecCard({hardwareData, bottomDiv}: LocalParams) {
    const navigate = useNavigate();

    const handleMoreClick = () => {
        navigate(`/edit-hardware/${hardwareData._id}`)
    }

    return <div className="flex flex-col gap-2 border rounded p-4">
        <div className="flex gap-2">
            <label className="font-bold text-gray-600 text-xs mt-1">модель:</label>
            <label>{hardwareData.model}</label>
        </div>
        <div className="flex gap-2">
            <label className="font-bold text-gray-600 text-xs mt-1">серійний номер:</label>
            <label>{hardwareData.model}</label>
        </div>
        <div className="flex gap-2">
            <label className="font-bold text-gray-600 text-xs mt-1">рік випуску:</label>
            <label>{hardwareData.year}</label>
        </div>
        <div >
            <button type="button" className={submitButtonStyle} onClick={handleMoreClick}>детальніше</button>
        </div>
        <div>
            {bottomDiv}
        </div>
    </div>
}

export default HardwareRecCard;