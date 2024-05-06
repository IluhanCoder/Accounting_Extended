import { ChangeEvent, FormEvent, useState } from "react";
import { HardwareRequest, ModificationRequest, ServiceRequest, hardwareRequestCredentials, modificationRequestCredentials, modificationRequestResponse, serviceRequestCredentials } from "./request-types";
import requestService from "./request-service";
import { toast } from "react-toastify";
import { inputStyle } from "../styles/form-styles";
import userStore from "../user/user-store";
import { observer } from "mobx-react";
import { submitButtonStyle } from "../styles/button-syles";
import UserPicker from "../user/user-picker";
import User, { UserResponse } from "../user/user-types";
import DatePicker from "../misc/date-picker";

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

    const handleUserPick = (user: User) => {
        setFormData({...formData, user});
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
    };    

    const handleRequestToPush = (user: User) => {
        setFormData({...formData, requestTo: user})
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

    return <div className="p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex justify-center text-2xl">
                створення запиту на обладнання
            </div>
            <div className="flex flex-col gap-2 px-10">
                <label className="font-bold text-gray-600 text-xs">тип</label>
                <input className={inputStyle} type="text" onChange={handleChange} name="type"/>
            </div>
            <div className="flex flex-col gap-2 px-10">
                <label className="font-bold text-gray-600 text-xs">модель</label>
                <input className={inputStyle} type="text" onChange={handleChange} name="model"/>
            </div>
            <div className="flex flex-col gap-2 px-10">
                <label className="font-bold text-gray-600 text-xs">бажані характеристики</label>
                <textarea className={inputStyle} onChange={handleChange} name="chars"/>
            </div>
            <div className="flex flex-col gap-2 px-10">
                <label className="font-bold text-gray-600 text-xs">мета застосування</label>
                <input className={inputStyle} type="text" onChange={handleChange} name="purpose"/>
            </div>
            <div className="grid grid-cols-2 gap-2 px-10 py-4">
                <div className="flex flex-col gap-2 px-10">
                    <label className="font-bold text-gray-600 text-xs">умови</label>
                    <select className={inputStyle} value={rentSwitch ? "true" : "false"} onChange={handleRentSwitch}>
                        <option value="false">купівля</option>
                        <option value="true">оренда</option>
                    </select>
                </div>
                {rentSwitch && <DatePicker value={formData.rent} handleChange={handleDateChange}/>}
                <div className="flex flex-col gap-2 px-10">
                    <label className="font-bold text-gray-600 text-xs">критичність</label>
                    <select className={inputStyle} onChange={handleChange} name="crit">
                        <option value="терміново">терміново</option>
                        <option value="критично">критично</option>
                        <option value="важливо">важливо</option>
                        <option value="не терміново">не терміново</option>
                    </select>
                </div>
            </div>
            
            <div className="border p-2 rounded">
                <UserPicker closeAfterSubit label="користувач (якщо є)" handlePush={handleUserPick}/>
                <div className="flex justify-center text-xl">{formData.user?.nickname}</div>
            </div>
            <div className="border p-2 rounded">
                <UserPicker closeAfterSubit label="керівник, якому надсилатиметься запит" handlePush={handleRequestToPush} role="main"/>
                <div className="flex justify-center text-xl">{formData.requestTo?.nickname}</div>
            </div>
            <div className="flex justify-center mt-2">
                <button type="submit" className={submitButtonStyle + " w-1/2"}>створити запит</button>
            </div>
        </form>
    </div>
}

export default observer(HardwareRequestPage);