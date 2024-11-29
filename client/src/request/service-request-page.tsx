import { ChangeEvent, FormEvent, useState } from "react";
import { ModificationRequest, ServiceRequest, modificationRequestCredentials, modificationRequestResponse, serviceRequestCredentials } from "./request-types";
import requestService from "./request-service";
import { toast } from "react-toastify";
import { inputStyle, selectStyle, staticFormContainerStyle, staticFormStyle } from "../styles/form-styles";
import userStore from "../user/user-store";
import { observer } from "mobx-react";
import { submitButtonStyle } from "../styles/button-syles";
import UserPicker from "../user/user-picker";
import User, { UserResponse } from "../user/user-types";
import OptionsMapper from "../selection/options-mapper";
import { Categories } from "../hardware/hardware-types";
import { horizontalSelectionPlateStyle } from "../styles/selector-styles";

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

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
    };    

    const handleAdminPush = (name: string, user: User | null) => {
        if(user) setFormData({...formData, admin: user})
    }

    return <div className={staticFormContainerStyle}>
        <form onSubmit={handleSubmit} className={staticFormStyle + " px-10"}>
            <div className="flex justify-center py-3 text-2xl">
                запит на обслуговування
            </div>
            <div className="flex flex-col gap-2">
                <select name="type" className={selectStyle} onChange={handleChange}>
                    <OptionsMapper options={Categories}/>
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <textarea placeholder="опис проблеми" className={inputStyle} onChange={handleChange} name="problem"/>
            </div>
            <div className="flex flex-col gap-2">
                <select className={inputStyle} onChange={handleChange} name="crit">
                    <option value="терміново">терміново</option>
                    <option value="критично">критично</option>
                    <option value="важливо">важливо</option>
                    <option value="не терміново">не терміново</option>
                </select>
            </div>
            <div className="mt-2 flex justify-center">
                <UserPicker className={horizontalSelectionPlateStyle} closeAfterSubmit label="відповідальний адміністратор" onChange={handleAdminPush} role="admin"/>
                {/* <div className="flex justify-center text-xl">{formData.admin?.nickname}</div> */}
            </div>
            <div className="flex justify-center mt-2">
                <button type="submit" className={submitButtonStyle}>створити запит</button>
            </div>
        </form>
    </div>
}

export default observer(ServiceRequestPage);