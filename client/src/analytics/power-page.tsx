import { ChangeEvent, useEffect, useState } from "react";
import { PowerResponse } from "./analytics-types";
import analyticsService from "./analytics-service";
import SearchPanel from "../hardware/search-panel";
import SearchInput from "../misc/search-input";
import PowerCard from "./power-card";
import LoadingScreen from "../misc/loading-screen";
import stringHelper from "../misc/string-helper";
import DatePicker from "../misc/date-picker";

export default function PowerPage() {
    const [input, setInput] = useState<string>("");
    const extraDate = new Date();
    extraDate.setDate(extraDate.getDate() - 20)
    const [startDate, setStartDate] = useState<Date>(extraDate);
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [data, setData] = useState<PowerResponse[] | undefined>(undefined);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    }

    const getData = async () => {
        const result = await analyticsService.calculatePower(startDate, endDate);
        setData([...result.result]);
    }

    const filterData = () => {
        if(data && data.length > 0) return data?.filter((item: PowerResponse) => stringHelper.unstrictCompare(item.departament.name, input));
    }

    const handleDateChange = ({startDate, endDate}: {startDate: Date, endDate: Date}) => {
        setStartDate(startDate);
        setEndDate(endDate);
        setData(undefined);
        getData();
    }

    useEffect(() => {
        getData()
    }, []);

    return <div className="w-full flex flex-col gap-4 p-4">
        <div className="flex gap-2 justify-center">
            <div className="flex flex-col justify-end">
                <SearchInput className="h-fit" onChange={handleInputChange}/>
            </div>
            <div>
                <DatePicker handleChange={handleDateChange} value={{startDate, endDate}} className="flex gap-2"/>
            </div>
        </div>
        {data && (filterData.length === 0 ? <div className="flex flex-wrap gap-2">
            {
                filterData()?.map((item: PowerResponse) => <PowerCard data={item}/>)
            }
        </div> : <div className="flex w-full h-full justify-center p-20">
            <div>інформація відсутня</div>
        </div>) || <LoadingScreen/>}
    </div>
}