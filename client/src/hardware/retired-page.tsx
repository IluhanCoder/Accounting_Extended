import { useEffect, useState } from "react";
import { HardwareResponse } from "./hardware-types";
import hardwareService from "./hardware-service";
import { submitButtonStyle } from "../styles/button-syles";
import UtilizationCard from "./utilization-card";
import SellCard from "./sell-card";
import ModificationCard from "./modification-card";

function RetiredPage() {
    interface LocalState {
        modification: HardwareResponse[],
        utilization: HardwareResponse[],
        sell: HardwareResponse[]
    }

    const [data, setData] = useState<LocalState>();
    const [openInputs, setOpenInputs] = useState<boolean[]>([]);

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
        <div className="flex flex-col gap-2">
            <div className="text-xl">модернізація:</div>
            <div className="flex flex-wrap gap-4">
                {data && data?.modification?.length > 0 && data?.modification.map((hard: HardwareResponse) => {
                    return <ModificationCard callBack={() => getData()} hardwareData={hard}/>
                }) || <div className="text-center p-6">запити відсутні</div>}
            </div>
        </div>
        <div className="flex flex-col gap-2">
            <div className="text-xl">утилізація:</div>
            <div className="flex flex-wrap gap-4">
                {data && data.utilization.length>0 && data?.utilization.map((hard: HardwareResponse) => {
                    return <UtilizationCard callBack={() => getData()} hardwareData={hard}/>
                }) || <div className="text-center p-6">запити відсутні</div>}
            </div>
        </div>
        <div className="flex flex-col gap-2">
            <div className="text-xl">на продаж:</div>
            <div className="flex flex-wrap gap-4">
                {data && data.sell.length > 0 && data?.sell.map((hard: HardwareResponse) => {
                    return <SellCard callBack={() => getData()} hardwareData={hard}/>
                }) || <div className="text-center p-6">запити відсутні</div>}
            </div>
        </div>
    </div>
}

export default RetiredPage;