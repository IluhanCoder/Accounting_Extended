import { ChangeEvent, useState } from "react";
import { inputStyle, selectStyle, smallInputStyle } from "../styles/form-styles";
import User from "../user/user-types";
import Departament, { DepartamentResponse } from "../departament/departament-types";
import SelectionPlate from "../selection/selection-plate";
import userService from "../user/user-service";
import departamentService from "../departament/departament-service";
import UserPicker from "../user/user-picker";
import DepartamnetPicker from "../departament/departament-picker";
import { IoIosSearch } from "react-icons/io";
import { grayButtonStyle, submitButtonStyle } from "../styles/button-syles";
import OptionsMapper from "../selection/options-mapper";
import { Categories } from "./hardware-types";
import SearchInput from "../misc/search-input";
import { horizontalSelectionPlateStyle } from "../styles/selector-styles";

interface LocalParams {
    onChange: (name: string, value: any) => void,
    isPersonal?: boolean
}

function SearchPanel({ onChange, isPersonal }: LocalParams) {
    const [extendedMode, setExtendedMode] = useState<boolean>(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        onChange(event.target.name, event.target.value)
    }

    return <div className="flex flex-col gap-2 py-4 w-full">
        <div className="flex flex-col w-full">
            {extendedMode && <div className="pb-4 flex justify-center">
                <div className="flex flex-col gap-4 bg-white px-6 py-4">
                    <div className="flex gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="w-full">
                                <select name="category" className={selectStyle + " w-full"} onChange={handleInputChange}>
                                    <option value="">все обладнання</option>
                                    <OptionsMapper options={Categories} />
                                </select>
                            </div>
                            <div className="fle w-80 justify-center gap-4">
                                <input placeholder="серійний номер" className={inputStyle + " w-full"} name="serial" onChange={handleInputChange} />
                            </div>
                            <div className="flex w-80 justify-center gap-4">
                                <input placeholder="IP адреса" className={inputStyle + " w-full"} name="ip" onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="flex flex-col gap-2">
                                {!isPersonal && <div className="flex w-full justify-start p-2 flex-wrap h-fit ">
                                    <UserPicker className={horizontalSelectionPlateStyle} label="користувач" onChange={onChange} />
                                </div>}
                                <div className="flex w-full justify-start flex-wrap p-2 h-fit ">
                                    <DepartamnetPicker className={horizontalSelectionPlateStyle} onChange={onChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                        <button type="button" className={grayButtonStyle + " text-nowrap text-xs"} onClick={() => setExtendedMode(false)}>
                            закрити розширений пошук
                        </button>
                    </div>
                </div>
            </div>}
            <div className="flex w-full justify-center gap-4 px-28">
                <SearchInput name="model" placeholder="назва моделі" className="w-full bg-white" onChange={handleInputChange}/>
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