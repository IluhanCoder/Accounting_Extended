import { useEffect, useState } from "react";
import { SelledHardwareResponse } from "./hardware-types";
import hardwareService from "./hardware-service";
import DateFormater from "../misc/date-formatter";
import cardStyle from "../styles/card-styles";

function SelledHardwarePage() {
    const [hardware, setHardware] = useState<SelledHardwareResponse[]>();

    const getData = async() => {
        const {hardware} = await hardwareService.getSelledHardware();
        setHardware([...hardware]);
    }

    useEffect(() => {
        getData();
    }, [])

    return <div className="p-6 flex flex-col gap-4">
        <div className="text-center text-2xl">продане обладнання</div>
        <div className="flex flex-wrap gap-2">
            {hardware?.map((hard: SelledHardwareResponse) => 
                <div className={cardStyle}>
                    <div className="flex gap-2">
                        <label>Тип:</label>
                        <label>{hard.hardware.type}</label>
                    </div>
                    <div className="flex gap-2">
                        <label>Модель:</label>
                        <label>{hard.hardware.model}</label>
                    </div>
                    <div className="flex gap-2">
                        <label>Серійний номер:</label>
                        <label>{hard.hardware.serial}</label>
                    </div>
                    <div className="flex gap-2">
                        <label>характеристики:</label>
                        <label>{hard.hardware.chars}</label>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>дата продажу:</label>
                        <DateFormater dayOfWeek value={hard.date}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>коментар:</label>
                        <label>{hard.comment}</label>
                    </div>
                </div>
            )}
        </div>
    </div>
}

export default SelledHardwarePage;