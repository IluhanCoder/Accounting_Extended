import { useEffect, useState } from "react";
import User from "../user/user-types";
import userService from "../user/user-service";
import { lightButtonStyle, submitButtonStyle } from "../styles/button-syles";
import Departament from "../departament/departament-types";
import { IoIosSearch } from "react-icons/io";
import { smallInputStyle } from "../styles/form-styles";
import SelectionMapper from "./selection-mapper";

interface LocalParams<T> {
    onChange: (entry: T | null) => void,
    data: T[],
    buttonLabel?: string,
    closeAfterSubmit?: boolean,
    label?: string,
    filterField: (item: T, value: string) => boolean,
    displayField: (item: T) => string
}

function Selector<T>({onChange, displayField, data, buttonLabel, closeAfterSubmit, label, filterField}: LocalParams<T>) {
    const [array, setArray] = useState<T[]>(data);
    const [openSwitch, setOpenSwitch] = useState<boolean>(false);

    if(!buttonLabel) buttonLabel = "додати";

    const handleClose = () => {
        if(closeAfterSubmit) setOpenSwitch(false);
    }

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
        {openSwitch && <SelectionMapper<T> onClose={handleClose} displayField={displayField} onChange={onChange} data={array} filterField={filterField}/>}
    </div>
}

export default Selector;