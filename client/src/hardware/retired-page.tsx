import { useEffect, useState } from "react";
import { HardwareResponse } from "./hardware-types";
import hardwareService from "./hardware-service";
import { submitButtonStyle } from "../styles/button-syles";
import UtilizationCard from "./utilization-card";
import SellCard from "./sell-card";
import ModificationCard from "./modification-card";
import { inputStyle } from "../styles/form-styles";

function RetiredPage() {
    interface LocalState {
        modification: HardwareResponse[],
        utilization: HardwareResponse[],
        sell: HardwareResponse[]
    }

    const [data, setData] = useState<LocalState>();
    const [openInputs, setOpenInputs] = useState<boolean[]>([]);
    const [selector, setSelector] = useState<string>("modernization");

    const getData = async () => {
        const modification = (await hardwareService.filterHardware([{$match: {modification: {$ne: null}}}])).hardware;
        const utilization = (await hardwareService.filterHardware([{$match: {"utilization.sell": false}}])).hardware;
        const sell = (await hardwareService.filterHardware([{$match: {"utilization.sell": true}}])).hardware;
        setData({
            modification,
            utilization,
            sell
        })
    }

    const handleOpenInput = (index: number) => {
        let temp = openInputs;
        temp[index] = !openInputs[index];
        setOpenInputs([...temp]);
    }

    useEffect(() => {
        getData();
    }, [])

    return <div className="p-6 flex flex-col gap-4">
        <div className="flex justify-center w-full">
            <select value={selector} onChange={(e) => setSelector(e.target.value)} className={inputStyle}>
                <option value="modernization">модернізація</option>
                <option value="utilization">утилізація</option>
                <option value="sell">продаж</option>
            </select>
        </div>
        <div className="flex flex-col gap-2">
            {selector === "modernization" && <div className="flex flex-wrap gap-4">
                {data && data?.modification?.length > 0 && data?.modification.map((hard: HardwareResponse) => {
                    return <ModificationCard callBack={() => getData()} hardwareData={hard}/>
                }) || <div className="flex justify-center p-20 w-full">запити відсутні</div>}
            </div>}
            {selector === "utilization" && <div className="flex flex-wrap gap-4">
                {data && data.utilization.length>0 && data?.utilization.map((hard: HardwareResponse) => {
                    return <UtilizationCard callBack={() => getData()} hardwareData={hard}/>
                }) || <div className="flex justify-center p-20 w-full">запити відсутні</div>}
            </div>}
            {selector === "sell" && <div className="flex flex-wrap gap-4">
                {data && data.sell.length > 0 && data?.sell.map((hard: HardwareResponse) => {
                    return <SellCard callBack={() => getData()} hardwareData={hard}/>
                }) || <div className="flex justify-center p-20 w-full">запити відсутні</div>}
            </div>}
        </div>
    </div>
}

export default RetiredPage;