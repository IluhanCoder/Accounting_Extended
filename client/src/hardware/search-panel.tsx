import { ChangeEvent, useState } from "react";
import { inputStyle, smallInputStyle } from "../styles/form-styles";
import User from "../user/user-types";
import Departament, { DepartamentResponse } from "../departament/departament-types";
import SelectionModal from "../selection/selection-modal";
import userService from "../user/user-service";
import departamentService from "../departament/departament-service";
import UserPicker from "../user/user-picker";
import DepartamnetPicker from "../departament/departament-picker";
import { IoIosSearch } from "react-icons/io";
import { grayButtonStyle, submitButtonStyle } from "../styles/button-syles";
import OptionsMapper from "../selection/options-mapper";
import { Categories } from "./hardware-types";

interface LocalParams {
    onChange: (name: string, value: any) => void,
    isPersonal?: boolean
}

function SearchPanel({ onChange, isPersonal }: LocalParams) {
    const [extendedMode, setExtendedMode] = useState<boolean>(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        onChange(event.target.name, event.target.value)
    }

    return <div className="flex flex-col gap-2 py-4 px-8 w-full">
        <div className="flex flex-col w-full">
            {extendedMode && <div className="flex justify-center">
                <div className="flex flex-col gap-2 bg-white px-20 py-4">
                <div>
                    <select className={smallInputStyle} onChange={handleInputChange}>
                        <option value="">все обладнання</option>
                        <OptionsMapper options={Categories}/>
                    </select>
                </div>
                <div className="flex flex-grow justify-center gap-4">
                    <label>Серійний номер:</label>
                    <input className={smallInputStyle} name="serial" onChange={handleInputChange} />
                </div>
                <div className="flex flex-grow justify-center gap-4">
                    <label>Ip Адреса:</label>
                    <input className={smallInputStyle} name="ip" onChange={handleInputChange} />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    {!isPersonal && <div className="flex w-full justify-start p-2 flex-wrap border rounded h-fit ">
                        <UserPicker onChange={onChange} />
                    </div>}
                    <div className="flex w-full justify-start flex-wrap border p-2 rounded h-fit ">
                        <DepartamnetPicker onChange={onChange} />
                    </div>
                </div>
                <div>
                    <button type="button" className={grayButtonStyle + " text-nowrap text-xs"} onClick={() => setExtendedMode(false)}>
                        закрити розширений пошук
                    </button>
                </div>
                </div>
            </div>}
            <div className="flex w-full justify-center gap-4 px-28">
                <div className={inputStyle + " flex gap-2 shadow shadow-lg shadow-blue-200 w-full"}>
                    <IoIosSearch className="mt-1 text-gray-400"/>
                    <input name="model" placeholder="навза моделі" className="appearance-none grow border-none p-0 bg-transparent outline-none" onChange={handleInputChange} />
                </div>
                {!extendedMode && <div>
                    <button type="button" className={grayButtonStyle + " text-nowrap text-xs"} onClick={() => setExtendedMode(true)}>
                        розширений пошук
                    </button>
                </div>}
            </div>
        </div>
    </div>
}

export default SearchPanel;