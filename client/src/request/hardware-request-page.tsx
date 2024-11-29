import { ChangeEvent, FormEvent, useState } from "react";
import { HardwareRequest, ModificationRequest, ServiceRequest, hardwareRequestCredentials, modificationRequestCredentials, modificationRequestResponse, serviceRequestCredentials } from "./request-types";
import requestService from "./request-service";
import { toast } from "react-toastify";
import { inputStyle, selectStyle, staticFormContainerStyle, staticFormStyle } from "../styles/form-styles";
import userStore from "../user/user-store";
import { observer } from "mobx-react";
import { submitButtonStyle } from "../styles/button-syles";
import UserPicker from "../user/user-picker";
import User, { UserResponse } from "../user/user-types";
import DatePicker from "../misc/date-picker";
import { Categories } from "../hardware/hardware-types";
import OptionsMapper from "../selection/options-mapper";
import { horizontalSelectionPlateStyle } from "../styles/selector-styles";

function HardwareRequestPage() {
    const [rentSwitch, setRentSwitch] = useState<boolean>(false);

    const defaultData = {
        type: "",
        model: "",
        chars: "",
        purpose: "",
        rent: null,
        user: null,
        crit: "терміново",
        requestTo: undefined

    };

    const [formData, setFormData] = useState<hardwareRequestCredentials>(defaultData);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if(!userStore.user?._id) {
            toast.error("необхідно авторизуватися");
            return;
        }
        if(!formData.requestTo) {
            toast.error("ви маєте обрати, кому надсилатиметься запит");
            return;
        }
        const request: HardwareRequest = {
            ...formData,
            admin: userStore.user?._id,
            user: formData.user?._id ?? null,
            requestTo: formData.requestTo._id,
            status: "created",
            date: new Date()
        };
        toast("обробка запиту...");
        await requestService.createHardwareRequest(request as HardwareRequest);
        toast.success("запит було успішно надіслано");
        setFormData({...defaultData});
    }

    const handleUserPick = (name: string, user: User | null) => {
        setFormData({...formData, user});
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
    };    

    const handleRequestToPush = (name: string, user: User | null) => {
        if(user) setFormData({...formData, requestTo: user})
    }

    const handleRentSwitch = (event: ChangeEvent<HTMLSelectElement>) => {
        const condition = event.target.value === "true";
        setRentSwitch(condition);
        if(condition) {
            const tempDate = new Date();
            tempDate.setDate((new Date()).getDate() + 10);
            setFormData({...formData, rent: {startDate: new Date(), endDate: tempDate}});
        } else {
            setFormData({...formData, rent: null});
        }
        
    }

    const handleDateChange = (newValue: {startDate: Date, endDate: Date}) => {
        setFormData({...formData, rent: newValue});
    }

    return <div className={staticFormContainerStyle}>
        <form onSubmit={handleSubmit} className={staticFormStyle}>
            <div className="flex justify-center text-2xl py-3">
                створення запиту на обладнання
            </div>
            <div className="flex w-full gap-2 px-10">
                <select className={selectStyle + " w-full"} name="type" onChange={handleChange}>
                    <OptionsMapper options={Categories} />
                </select>
            </div>
            <div className="flex w-full gap-2 px-10">
                <input placeholder="модель" className={inputStyle + " w-full"} type="text" onChange={handleChange} name="model"/>
            </div>
            <div className="flex w-full gap-2 px-10">
                <textarea placeholder="бажанні характеристики" className={inputStyle + " w-full"} onChange={handleChange} name="chars"/>
            </div>
            <div className="flex w-full px-10">
                <input placeholder="мета застосування" className={inputStyle + " w-full"} type="text" onChange={handleChange} name="purpose"/>
            </div>
            <div className="px-10">
                <div className="flex flex-col gap-2">
                    <select className={selectStyle + " w-full"} onChange={handleChange} name="crit">
                        <option value="терміново">терміново</option>
                        <option value="критично">критично</option>
                        <option value="важливо">важливо</option>
                        <option value="не терміново">не терміново</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-col w-full px-10">
                <div className="flex w-full gap-2">
                    <select className={selectStyle + " w-full"} value={rentSwitch ? "true" : "false"} onChange={handleRentSwitch}>
                        <option value="false">купівля</option>
                        <option value="true">оренда</option>
                    </select>
                </div>
                {rentSwitch && <DatePicker className="flex justify-center gap-6 pt-2 pb-4" value={formData.rent} handleChange={handleDateChange}/>}
            </div>
            <div className="flex justify-center p-2 ">
                <UserPicker className={horizontalSelectionPlateStyle} closeAfterSubmit label="користувач (якщо є)" onChange={handleUserPick}/>
            </div>
            <div className="flex justify-center p-2">
                <UserPicker className={horizontalSelectionPlateStyle} closeAfterSubmit label="керівник, якому надсилатиметься запит" onChange={handleRequestToPush} role="main"/>
            </div>
            <div className="flex justify-center mt-2">
                <button type="submit" className={submitButtonStyle + " w-1/2"}>створити запит</button>
            </div>
        </form>
    </div>
}

export default observer(HardwareRequestPage);