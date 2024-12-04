import { useEffect, useState } from "react";
import { SoftwareResponse } from "./software-types";
import LoadingScreen from "../misc/loading-screen";
import SearchInput from "../misc/search-input";
import cardStyle from "../styles/card-styles";
import softwareIsExpired from "./software-is-expired";
import DateFormater from "../misc/date-formatter";
import stringHelper from "../misc/string-helper";
import softwareService from "./software-service";
import { redButtonSyle } from "../styles/button-syles";
import { toast } from "react-toastify";

export default function SoftwarePage() {
    const [data, setData] = useState<SoftwareResponse[]>();
    const [input, setInput] = useState<string>("");

    const handleInputChange = (event: any) => {
        setInput(event.target.value);
    }

    const filterData = () => {
        if(data) return data?.filter((software: SoftwareResponse) => stringHelper.unstrictCompare(software.name, input))
        else return []
    }

    const getData = async () => {
        const result = await softwareService.fetchSoftware();
        setData([...result.software]);
    }

    const handleDelete = async (softwareId: string) => {
        toast("обробка запиту...");
        const result = await softwareService.deleteById(softwareId);
        if(result.status === "success") { 
            toast.success("програмне забезпечення успішно видалено"); 
            getData();
        }
    }

    useEffect(() => { getData() },[]);

    if(data)
        return filterData().length > 0 && <div className="flex flex-col w-full gap-2 p-4">
        <SearchInput placeholder="програмне забезпечення" onChange={handleInputChange}/>
        <div className="flex flex-wrap gap-2">
            {filterData().map((software: SoftwareResponse) => <div className={cardStyle + " text-sm border " + (softwareIsExpired(software) ? " border-red-600" : "")}>
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
                            <div className="flex w-full pt-3 justify-center">
                                <button type="button" onClick={() => handleDelete(software._id)} className={redButtonSyle}>видалити</button>
                            </div>
                        </div>)}
        </div>
        </div> || <div className="flex justify-center w-full">
            <div>програмне забезпечення відсутнє</div>
        </div>
    else return <LoadingScreen/>
}