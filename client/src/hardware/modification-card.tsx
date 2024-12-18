import { useState } from "react";
import { submitButtonStyle } from "../styles/button-syles";
import { HardwareResponse } from "./hardware-types";
import HardwareRecCard from "./hardware-rec-card";
import hardwareService from "./hardware-service";
import { inputStyle } from "../styles/form-styles";
import { toast } from "react-toastify";
import cardStyle from "../styles/card-styles";

interface LocalParams {
    hardwareData: HardwareResponse,
    callBack: () => void
}
    
function ModificationCard({hardwareData, callBack}: LocalParams) {
    const [showInput, setShowInput] = useState<boolean>(false);
    const [chars, setChars] = useState<string>("");

    const handleSubmit = async () => {
        await hardwareService.modernize(hardwareData._id, chars);
        toast.success("обладнання було успішно модернізовано");
        callBack()
    }

    const bottomDiv = <div className="flex flex-col gap-2">
        <button className={submitButtonStyle} onClick={() => setShowInput(!showInput)}>
            модернізувати
        </button>
        {showInput && 
            <div className={cardStyle}>
                <div className="flex flex-col gap-2">
                    <label className="font-bold text-gray-600 text-xs">нові характеристики</label>
                    <input type="text" className={inputStyle} value={chars} onChange={(e) => setChars(e.target.value)}/>
                </div>
                <button className={submitButtonStyle} onClick={handleSubmit}>затвердити</button>
            </div>}
    </div>
    return <HardwareRecCard hardwareData={hardwareData} bottomDiv={bottomDiv}/>
}

export default ModificationCard;