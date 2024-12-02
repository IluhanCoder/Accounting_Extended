import { Link } from "react-router-dom";
import { submitButtonStyle } from "../styles/button-syles";
import { HardwareResponse } from "./hardware-types";
import cardStyle from "../styles/card-styles";

interface LocalParams {
    hardwareData: HardwareResponse
}

function HardwareCard({ hardwareData }: LocalParams) {
    console.log(hardwareData);

    return <div className={cardStyle}>
        <div className="flex flex-col gap-1 justify-center h-full pb-4">
            <div className="flex justify-center text-xl py-1">
                {hardwareData.model}
            </div>
            <div className="text-xs flex gap-2">
                <label>Серійний номер:</label>
                <label>{hardwareData.serial}</label>
            </div>
            {hardwareData.user && <div className="text-xs flex gap-2">
                <label>Користувач:</label>
                <label>{hardwareData.user.nickname}</label>
            </div>}
            <div className="text-xs flex gap-2">
                <label>Адміністратор:</label>
                <label>{hardwareData.admin.nickname}</label>
            </div>
            {hardwareData.ip.length > 0 && <div className="text-xs mt-2">
                <div>ip адреси:</div>
                <div className="h-6 overflow-auto text-gray-400">
                    {hardwareData.ip.map((ip: string) => <div>
                        {ip}
                    </div>)}
                </div>
            </div>}
        </div>
        <div className="flex justify-center">
            <Link className={submitButtonStyle} to={`/edit-hardware/${hardwareData._id}`}>Деталі</Link>
        </div>
    </div>
}

export default HardwareCard;