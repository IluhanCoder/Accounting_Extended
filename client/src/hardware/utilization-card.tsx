import { toast } from "react-toastify";
import { submitButtonStyle } from "../styles/button-syles";
import HardwareRecCard from "./hardware-rec-card";
import hardwareService from "./hardware-service";
import { HardwareResponse } from "./hardware-types";

interface LocalParams {
    hardwareData: HardwareResponse,
    callBack: () => void
}

function UtilizationCard({hardwareData, callBack}: LocalParams) {
    const handleUtilization = async () => {
        await hardwareService.deleteById(hardwareData._id);
        toast.success("обладнання було утилізовано");
        callBack();
    }

    const bottomDiv = <div className="">
        <button className={submitButtonStyle} onClick={handleUtilization}>утилізувати</button>
    </div>

    return <HardwareRecCard hardwareData={hardwareData} bottomDiv={bottomDiv}/>
}

export default UtilizationCard;