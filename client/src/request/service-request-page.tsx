import { ChangeEvent, FormEvent, useState } from "react";
import { ModificationRequest, ServiceRequest, modificationRequestCredentials, modificationRequestResponse, serviceRequestCredentials } from "./request-types";
import requestService from "./request-service";
import { toast } from "react-toastify";
import { inputStyle } from "../styles/form-styles";
import userStore from "../user/user-store";
import { observer } from "mobx-react";
import { submitButtonStyle } from "../styles/button-syles";
import UserPicker from "../user/user-picker";
import User, { UserResponse } from "../user/user-types";

function ServiceRequestPage() {
    const defaultData = {
        requester: userStore?.user?._id,
        type: "",
        problem: "",
        crit: "терміново",
        admin: undefined
    }

    const [formData, setFormData] = useState<serviceRequestCredentials>(defaultData);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if(!formData.admin) {
            toast.error("необхідно обрати відповідального адміністратора");
            return;
        }
        if(!formData.requester) {
            toast.error("необхідно авторизуватися");
            return;
        }
        const request = {
            ...formData,
            admin: formData.admin?._id,
            date: new Date()
        }; 
        toast("обробка запиту...");
        await requestService.createServiceRequest(request as ServiceRequest);
        toast.success("запит було успішно надіслано");
        setFormData({...defaultData});
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
    };    

    const handleAdminPush = (user: User) => {
        setFormData({...formData, admin: user})
    }

    return <div className="p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex justify-center text-2xl">
                створення запиту на обслуговування обладнання
            </div>
            <div className="flex flex-col gap-2 px-10">
                <label className="font-bold text-gray-600 text-xs">тип</label>
                <input className={inputStyle} type="text" onChange={handleChange} name="type"/>
            </div>
            <div className="flex flex-col gap-2 px-10">
                <label className="font-bold text-gray-600 text-xs">опис проблеми</label>
                <input className={inputStyle} type="text" onChange={handleChange} name="problem"/>
            </div>
            <div className="flex flex-col gap-2 px-10">
                <label className="font-bold text-gray-600 text-xs">критичність</label>
                <select className={inputStyle} onChange={handleChange} name="crit">
                    <option value="терміново">терміново</option>
                    <option value="критично">критично</option>
                    <option value="важливо">важливо</option>
                    <option value="не терміново">не терміново</option>
                </select>
            </div>
            <div className="border p-2 rounded mt-2">
                <UserPicker closeAfterSubit label="відповідальний адміністратор" handlePush={handleAdminPush} role="admin"/>
                <div className="flex justify-center text-xl">{formData.admin?.nickname}</div>
            </div>
            <div className="flex justify-center mt-2">
                <button type="submit" className={submitButtonStyle}>створити запит</button>
            </div>
        </form>
    </div>
}

export default observer(ServiceRequestPage);