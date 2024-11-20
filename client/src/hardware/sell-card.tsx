import { useState } from "react";
import { submitButtonStyle } from "../styles/button-syles";
import { HardwareResponse } from "./hardware-types";
import hardwareService from "./hardware-service";
import HardwareRecCard from "./hardware-rec-card";
import { inputStyle } from "../styles/form-styles";
import { toast } from "react-toastify";

interface LocalParams {
    hardwareData: HardwareResponse,
    callBack: () => void
}

function SellCard ({hardwareData, callBack}: LocalParams) {
    const [showInput, setShowInput] = useState<boolean>(false);
    const [comment, setComment] = useState<string>("");

    const handleSubmit = async () => {
        await hardwareService.sell(hardwareData._id, comment);
        toast.success("обладнання було позначено як продане");
        window.location.reload();
    }

    const bottomDiv = <>
        <button type="button" className={submitButtonStyle} onClick={() => setShowInput(!showInput)}>продати</button>
        {showInput && 
            <div className="flex flex-col gap-2 border p-4 rounded mt-2">
                <div className="flex flex-col gap-2">
                    <label className="font-bold text-gray-600 text-xs">коментар щодо продажу</label>
                    <input type="text" className={inputStyle} value={comment} onChange={(e) => setComment(e.target.value)}/>
                </div>
                <button className={submitButtonStyle} onClick={handleSubmit}>затвердити</button>
            </div>}
    </>

    return <HardwareRecCard bottomDiv={bottomDiv} hardwareData={hardwareData}/>
}

export default SellCard;