import { useEffect, useState } from "react";
import User from "../user/user-types";
import userService from "../user/user-service";
import { lightButtonStyle, submitButtonStyle } from "../styles/button-syles";
import Departament from "../departament/departament-types";
import { IoIosSearch } from "react-icons/io";
import { smallInputStyle } from "../styles/form-styles";

function Picker<type>({handlePush, data, buttonLabel, closeAfterSubmit, label, nickName}: {handlePush: (entry: type) => void, data: type[], buttonLabel?: string, closeAfterSubmit?: boolean, label: string, nickName?: boolean}) {
    const [array, setArray] = useState<type[]>(data);
    const [filter, setFilter] = useState<string>("");
    const [openSwitch, setOpenSwitch] = useState<boolean>(false);

    if(!buttonLabel) buttonLabel = "додати";

    return <div className={`flex flex-col gap-2 w-full`}>
        <div className="flex w-full ">
            {openSwitch && <button className={lightButtonStyle} onClick={() => setOpenSwitch(false)}>
                закрити
            </button> || <div className="flex w-full">
                <div className="flex gap-6 p-2 rounded w-full justify-center">
                    <label className="mt-1">{label}</label>
                    <button className={lightButtonStyle} onClick={() => setOpenSwitch(true)}>обрати</button>
                </div>
            </div>}
        </div>
        {openSwitch && <div className="flex flex-col p-4 border rounded bg-white">
            <div className="pb-4 pt-2 flex justify-center">
                <input type="text" className={smallInputStyle + " w-1/2"} value={filter} onChange={(e) => setFilter(e.target.value)}/>
                <IoIosSearch className="pl-2 text-gray-500" size={30}/>
            </div>
            <div className="flex gap-2 overflow-auto">
                {array.filter((element: type) => ((nickName ? (element as any).nickname : (element as any).name) as string).includes(filter)).map((entry: type, index: number) => 
                    <div key={index} className="bg-gray-50 rounded border py-2 px-5">
                        <div className="p-2 text-center">{nickName ? (entry as any).nickname : (entry as any).name}</div>
                        <div className="flex justify-center">
                            <button type="button" className={lightButtonStyle} onClick={() => {handlePush(entry as any); if(closeAfterSubmit) setOpenSwitch(false)}}>{buttonLabel}</button>
                        </div>
                    </div>
                )}
            </div>
        </div>}
    </div>
}

export default Picker;