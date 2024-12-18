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
import DropForm from "../forms/drop-form";
import TYPE_OPTIONS from "../hardware/type-options";
import { useParams } from "react-router-dom";
import CategoryAndTypeSelector from "../hardware/category-type-selector";

function HardwareRequestPage() {
    const hardwareId = useParams();
    const [rentSwitch, setRentSwitch] = useState<boolean>(false);
    const defaultType = ((TYPE_OPTIONS[Categories[0].value as keyof object])[0] as {value: string, label: string}).value;

    const defaultData = {
        category: Categories[0].value,
        hardware: hardwareId,
        type: defaultType,
        model: "",
        chars: "",
        purpose: "",
        rent: null,
        user: null,
        crit: "терміново",
        requestTo: undefined
    };

    const [formData, setFormData] = useState<hardwareRequestCredentials>(defaultData);
    const [typeOptions, setTypeOptions] = useState<{value: string, label: string}[]>(formData.category ? TYPE_OPTIONS[formData.category as keyof object] : []);

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
        DropForm();
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

    const onCategoryChange = (newType: string) => {
        setFormData({...formData, type: newType});
    }

    return <div className={staticFormContainerStyle}>
        <form id="form" onSubmit={handleSubmit} className={staticFormStyle}>
            <div className="flex justify-center text-2xl py-3">
                створення запиту на обладнання
            </div>
            <CategoryAndTypeSelector edit handleChange={handleChange} onCategoryChange={onCategoryChange} defaultCategory={formData.category} defaultType={formData.type}/>
            <div className="flex w-full gap-2 px-10">
                <input placeholder="модель" className={inputStyle + " w-full"} type="text" onChange={handleChange} name="model"/>
            </div>
            <div className="flex w-full gap-2 px-10">
                <textarea placeholder="бажанні характеристики" className={inputStyle + " w-full"} onChange={handleChange} name="chars"/>
            </div>
            <div className="flex w-full px-10">
                <input placeholder="мета застосування" className={inputStyle + " w-full"} type="text" onChange={handleChange} name="purpose"/>
            </div>
            <div className="flex gap-2 px-10 justify-center">
                <label className="font-bold text-gray-600 mt-1">ціна:</label>
                <input className={inputStyle} type="number" name="price" onChange={handleChange}/>
                <div className="mt-1">$</div>
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