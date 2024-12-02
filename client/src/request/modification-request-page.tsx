import { ChangeEvent, FormEvent, useState } from "react";
import { ModificationRequest, modificationRequestCredentials, modificationRequestResponse } from "./request-types";
import requestService from "./request-service";
import { toast } from "react-toastify";
import { inputStyle, staticFormContainerStyle, staticFormStyle } from "../styles/form-styles";
import userStore from "../user/user-store";
import { observer } from "mobx-react";
import { submitButtonStyle } from "../styles/button-syles";
import UserPicker from "../user/user-picker";
import User, { UserResponse } from "../user/user-types";
import { horizontalSelectionPlateStyle } from "../styles/selector-styles";
import OptionsMapper from "../selection/options-mapper";
import { Categories } from "../hardware/hardware-types";
import TYPE_OPTIONS from "../hardware/type-options";
import DropForm from "../forms/drop-form";

function ModificationRequestPage() {
    const defaultType = ((TYPE_OPTIONS[Categories[0].value as keyof object])[0] as {value: string, label: string}).value;

    const defaultData = {
        requester: userStore?.user?._id,
        type: defaultType,
        category: Categories[0].value,
        reason: "",
        chars: "",
        crit: "терміново",
        admin: null
    }
    const [formData, setFormData] = useState<modificationRequestCredentials>(defaultData);
    const [typeOptions, setTypeOptions] = useState<{value: string, label: string}[]>(formData.category ? TYPE_OPTIONS[formData.category as keyof object] : []);

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        const newOptions = TYPE_OPTIONS[newValue as keyof object];
        setTypeOptions([...newOptions]);
        setFormData({...formData, category: newValue, type: newOptions[0]});
    }

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
        await requestService.createmodificationRequest(request as ModificationRequest);
        toast.success("запит було успішно надіслано");

        setFormData({...defaultData});
        DropForm();
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
    };    

    const handleAdminPush = (name: string, user: User | null) => {
        if(user) setFormData({...formData, admin: user})
    }

    return <div>
        <div className={staticFormContainerStyle}>
        <form id="form" onSubmit={handleSubmit} className={staticFormStyle}>
            <div className="flex justify-center py-3 text-2xl">
                створення запиту на модифікацію обладнання
            </div>
            <div className="flex flex-col gap-2 px-10">
                <select name="category" className={inputStyle} onChange={handleCategoryChange}>
                    <OptionsMapper options={Categories}/>
                </select>
            </div>
            <div className="flex flex-col gap-2 px-10">
                <select name="type" className={inputStyle} onChange={handleChange}>
                    <OptionsMapper options={typeOptions}/>
                </select>
            </div>
            <div className="flex flex-col gap-2 px-10">
                <input placeholder="причина модифікації" className={inputStyle} type="text" onChange={handleChange} name="reason"/>
            </div>
            <div className="flex flex-col gap-2 px-10">
                <input placeholder="бажанні характеристики" className={inputStyle} type="text" onChange={handleChange} name="chars"/>
            </div>
            <div className="flex flex-col gap-2 px-10">
                <select className={inputStyle} onChange={handleChange} name="crit">
                    <option value="терміново">терміново</option>
                    <option value="критично">критично</option>
                    <option value="важливо">важливо</option>
                    <option value="не терміново">не терміново</option>
                </select>
            </div>
            <div className="flex justify-center p-2 mt-2">
                <UserPicker className={horizontalSelectionPlateStyle} closeAfterSubmit label="відповідальний адміністратор" onChange={handleAdminPush} role="admin"/>
            </div>
            <div className="flex justify-center mt-2">
                <button type="submit" className={submitButtonStyle}>створити запит</button>
            </div>
        </form>
        </div>
    </div>
}

export default observer(ModificationRequestPage);