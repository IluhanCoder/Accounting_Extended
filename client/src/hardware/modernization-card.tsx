import { useState } from "react";
import { submitButtonStyle } from "../styles/button-syles";
import { HardwareResponse } from "./hardware-types";
import HardwareCard from "./hardware-card";
import hardwareService from "./hardware-service";
import { inputStyle } from "../styles/form-styles";
import { toast } from "react-toastify";

interface LocalParams {
    hardwareData: HardwareResponse,
    callBack: () => void
}
    
function ModernizationCard({hardwareData, callBack}: LocalParams) {
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
            <div className="flex flex-col gap-2 border p-4 rounded">
                <div className="flex flex-col gap-2">
                    <label className="font-bold text-gray-600 text-xs">нові характеристики</label>
                    <input type="text" className={inputStyle} value={chars} onChange={(e) => setChars(e.target.value)}/>
                </div>
                <button className={submitButtonStyle} onClick={handleSubmit}>затвердити</button>
            </div>}
    </div>
    return <HardwareCard hardwareData={hardwareData} bottomDiv={bottomDiv}/>
}

export default ModernizationCard;