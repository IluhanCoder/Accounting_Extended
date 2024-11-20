import { ChangeEvent } from "react";
import { smallInputStyle } from "../styles/form-styles";
import User from "../user/user-types";
import Departament, { DepartamentResponse } from "../departament/departament-types";
import SelectionModal from "../selection/selection-modal";
import userService from "../user/user-service";
import departamentService from "../departament/departament-service";
import UserPicker from "../user/user-picker";
import DepartamnetPicker from "../departament/departament-picker";

interface LocalParams {
    onChange: (name: string, value: any) => void,
    isPersonal?: boolean
}

function SearchPanel({ onChange, isPersonal }: LocalParams) {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        onChange(event.target.name, event.target.value)
    }

    return <div className="bg-gray-50 border flex flex-col gap-2 py-4 px-8">
    <div className="flex">
        <div>
            <select className={smallInputStyle} onChange={handleInputChange}>
                <option value="">все обладнання</option>
                <option value="comp">компʼютерне обладнання</option>
                <option value="net">мережеве обладнання</option>
                <option value="per">переферійне обладнання</option>
            </select>
        </div>
        <div className="flex flex-grow justify-center gap-4">
            <label>Модель обладнання:</label>
            <input className={smallInputStyle} name="model" onChange={handleInputChange}/>
        </div>
        <div className="flex flex-grow justify-center gap-4">
            <label>Серійний номер:</label>
            <input className={smallInputStyle} name="serial" onChange={handleInputChange}/>
        </div>
        <div className="flex flex-grow justify-center gap-4">
            <label>Ip Адреса:</label>
            <input className={smallInputStyle} name="ip" onChange={handleInputChange}/>
        </div>
    </div>
    <div className="grid grid-cols-2 gap-2">
        {!isPersonal && <div className="flex w-full justify-start p-2 flex-wrap border rounded h-fit ">
            <UserPicker onChange={onChange}/>
        </div>}
        <div className="flex w-full justify-start flex-wrap border p-2 rounded h-fit ">
            <DepartamnetPicker onChange={onChange}/> 
        </div>
    </div>
</div>
}

export default SearchPanel;