import { ChangeEvent, useEffect, useState } from "react";
import { HardwareResponse } from "./hardware-types";
import LoadingScreen from "../misc/loading-screen";
import hardwareService from "./hardware-service";
import User, { UserResponse } from "../user/user-types";
import { DepartamentResponse } from "../departament/departament-types";
import UserPicker from "../user/user-picker";
import { grayButtonStyle, lightButtonStyle, submitButtonStyle } from "../styles/button-syles";
import DepartamentPicker from "../departament/departament-picker";
import TYPE_OPTIONS from "./type-options";
import { useNavigate } from "react-router-dom";
import userStore from "../user/user-store";
import { observer } from "mobx-react";
import { smallInputStyle } from "../styles/form-styles";
import html2PDF from "jspdf-html2canvas";

function SearchPage({isPersonal}: {isPersonal?: boolean}) {
    const navigate = useNavigate();

    interface localFormData {
        category: string | undefined 
        model: string | undefined,
        serial: string | undefined,
        ip: string | undefined,
        user: User | undefined,
        departament: DepartamentResponse | undefined
    }

    const [hardware, setHardware] = useState<HardwareResponse[]>();
    const [formData, setFormData] = useState<localFormData>({
        category: undefined,
        model: undefined,
        serial: undefined,
        ip: undefined,
        user: undefined,
        departament: undefined
    });

    const filter = async () => {
        let $match = {};
        if(isPersonal) {
            const currentUser = userStore.user;
            if(currentUser?.role === "user") $match = {user: currentUser._id}
            if(currentUser?.role === "admin") $match = {admin: currentUser._id}
        }
        for(const key in formData) {
            const value = formData[key as keyof localFormData];
            if(value) 
                $match = {...$match, [key]: (typeof value === "string") ? ((key === "ip") ? { $in: [value] } : { $regex: value }) : value._id}
        }
        console.log($match);
        const res = await hardwareService.filterHardware([{$match}]);
        setHardware([...res.hardware]);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
    };    

    const handleUserPick = (user: User) => {
        setFormData({...formData, user});
    }

    const handleUserDrop = () => {
        setFormData({...formData, user: undefined});
    }

    const handleDepartamentPick = (departament: DepartamentResponse) => {
        setFormData({...formData, departament});
    }

    const handleDepartamentDrop = () => {
        setFormData({...formData, departament: undefined});
    }

    const generatePdf = async () => {
        const page = document.getElementById("results");
        const buttons = page?.querySelectorAll("button");
        buttons?.forEach((button: HTMLButtonElement) => {
            button.remove()
        })
        await html2PDF(page!, {
            jsPDF: {
              format: "a4",
            },
            imageType: "image/jpeg",
            output: "./pdf/generate.pdf",
          });
        window.location.reload();
      };

    useEffect(() => {
        filter();
    }, [formData]);

    if(hardware) return <div className="flex flex-col">
        <div className="bg-gray-50 border flex flex-col gap-2 py-4 px-8">
            <div className="flex  ">
                <div>
                    <select name="category" className={smallInputStyle} onChange={handleChange}>
                        <option value="">все обладнання</option>
                        <option value="comp">компʼютерне обладнання</option>
                        <option value="net">мережеве обладнання</option>
                        <option value="per">переферійне обладнання</option>
                    </select>
                </div>
                <div className="flex flex-grow justify-center gap-4">
                    <label>Модель обладнання:</label>
                    <input className={smallInputStyle} name="model" onChange={handleChange}/>
                </div>
                <div className="flex flex-grow justify-center gap-4">
                    <label>Серійний номер:</label>
                    <input className={smallInputStyle} name="serial" onChange={handleChange}/>
                </div>
                <div className="flex flex-grow justify-center gap-4">
                    <label>Ip Адреса:</label>
                    <input className={smallInputStyle} name="ip" onChange={handleChange}/>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                {!isPersonal && <div className="flex w-full justify-start p-2 flex-wrap border rounded h-fit ">
                    <UserPicker closeAfterSubit label="користувач" handlePush={handleUserPick} self/>
                    {formData.user && <div className="flex gap-4 justify-center w-full">
                        <div className="mt-3 text-xl">{formData.user?.nickname}</div>
                        <button type="button" className={grayButtonStyle + " text-sm h-fit mt-2"} onClick={handleUserDrop}>скинути</button>
                    </div>}
                </div>}
                <div className="flex w-full justify-start flex-wrap border p-2 rounded h-fit ">
                    <DepartamentPicker handlePush={handleDepartamentPick}/>
                    {formData.departament && <div className="flex gap-4 justify-center w-full">
                        <div className="mt-3 text-xl">{formData.departament?.name}</div>
                        <button type="button" className={grayButtonStyle + " text-sm h-fit mt-2"} onClick={handleDepartamentDrop}>скинути</button>
                    </div>}
                </div>
            </div>
        </div>
        <div className="flex flex-wrap p-4 gap-6" id="results">
            {hardware.map((hard: HardwareResponse) => {
                return <div className="flex flex-col justify-between border rounded py-4 px-7 gap-1">
                    <div>
                    <div className="flex justify-center text-xl py-1">
                        {hard.model}
                    </div>
                    <div className="text-xs flex gap-2">
                        <label>Серійний номер:</label>
                        <label>{hard.serial}</label>
                    </div>
                    {hard.user && <div className="text-xs flex gap-2">
                        <label>Користувач:</label>
                        <label>{hard.user.nickname}</label>
                    </div>}
                    <div className="text-xs flex gap-2">
                        <label>Адміністратор:</label>
                        <label>{hard.admin.nickname}</label>
                    </div>
                    {hard.ip.length > 0 && <div className="text-xs">
                            <div>ip адреси:</div>
                            <div className="h-6 overflow-auto text-gray-400">
                                {hard.ip.map((ip: string) => <div>
                                    {ip}
                                </div>)}
                            </div>
                        </div>}
                    </div>
                    <div className="flex justify-center">
                        <button className={submitButtonStyle} onClick={() => navigate(`/edit-hardware/${hard._id}`)}>Деталі</button>
                    </div>
                </div>
            })}
        </div>
        <div className="flex justify-center p-2">
            <button className={lightButtonStyle} type="button" onClick={generatePdf}>Завантажити звіт</button>
        </div>
    </div>
    else return <LoadingScreen/>
}

export default observer(SearchPage);