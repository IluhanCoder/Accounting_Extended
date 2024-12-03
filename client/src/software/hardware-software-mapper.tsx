import { useEffect, useState } from "react";
import { SoftwareResponse } from "./software-types";
import softwareService from "./software-service";
import LoadingScreen from "../misc/loading-screen";
import cardStyle from "../styles/card-styles";
import DateFormater from "../misc/date-formatter";
import softwareIsExpired from "./software-is-expired";

interface LocalParams {
    hardwareId: string
}

export default function HardwareSoftwareMapper ({hardwareId}: LocalParams) {
    const [software, setSoftware] = useState<SoftwareResponse[]>();

    const getData = async () => {
        const result = await softwareService.getHardwareSoftware(hardwareId);
        setSoftware([...result.software]);
    }

    useEffect(() => {
        getData();
    }, []);

    if(software) {
        return software.length > 0 && <div className="flex flex-col gap-2">
            <div className="w-full h-72 overflow-auto">
                <div className="flex flex-wrap gap-2 w-full">
                    {software.map((software: SoftwareResponse) => <div className={cardStyle + " text-sm border " + (softwareIsExpired(software) ? " border-red-600" : "")}>
                            {softwareIsExpired(software) && <div className="text-red-700 flex justify-center w-full">забезпечення протерміновано</div>}
                            <div className="flex justify-center text-xl">{software.name}</div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-600 font-bold">тип ліцензії:</label>
                                <div>
                                    {software.type}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-600 font-bold">дата протермінування ліцензії:</label>
                                <div>
                                    <DateFormater value={software.expirationDate} dayOfWeek/>
                                </div>
                            </div>
                        </div>)}
                </div>
            </div>
        </div> || <div className="flex w-full justify-center text-gray-600">програмне забезпечення відсутнє</div>
    }
    else return <LoadingScreen/>
}