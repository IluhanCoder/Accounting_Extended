import { ChangeEvent, useState } from "react";
import FormComponent from "../forms/form-component"
import SoftwareCredentials from "./software-types";
import formStyle, { formContainerStyle, inputStyle, staticFormContainerStyle, staticFormStyle } from "../styles/form-styles";
import ReactDatePicker from "react-datepicker";
import moment from "moment";
import HardwarePicker from "../hardware/hardware-picker";
import { HardwareResponse } from "../hardware/hardware-types";
import { horizontalSelectionPlateStyle } from "../styles/selector-styles";
import { submitButtonStyle } from "../styles/button-syles";
import softwareService from "./software-service";
import { toast } from "react-toastify";
import DropForm from "../forms/drop-form";

export default function NewSoftwarePage() {
    const [formData, setFormData] = useState<SoftwareCredentials>({
        name: "",
        type: "Apache License",
        description: "",
        expirationDate: new Date(),
        licenseId: null,
        hardware: undefined
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
    };    

    const handleDateChange = (newDate: Date) => {
        setFormData({
            ...formData,
            expirationDate: newDate
        })
    }

    const handleHardwareSelect = (name: string, value: HardwareResponse | null) => {
        setFormData({
            ...formData,
            hardware: value === null ? undefined : value
        })
    }

    const validateData = (): boolean => {
        return !Object.entries(formData)
        .some(([key, value]) => key !== 'hardware' && key !== "licenseKey" && (value === undefined || value === null));
    }

    const handleSubmit = async () => {
        if(!validateData) {
            toast.error("всі поля мають бути заповнені");
            return;
        }
        const result = await softwareService.createNewSoftware(formData);
        toast("обробка запиту...");
        if(result.status === "success") { 
            toast.success("програмне забезбечення успішно було додано");
            DropForm();
        }
    }

    return <div className={staticFormContainerStyle}>
        <form id="form" className={staticFormStyle}>
            <div className="flex justify-center">
                <h1>Нове програмне забезпечення</h1>
            </div>
            <input name="name" placeholder="назва" type="text" className={inputStyle} onChange={handleChange}/>
            <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-600 font-bold">тип ліцензії:</label>
                <select name="type" onChange={handleChange} className={inputStyle}>
                    <option value="Пропрієтарна (закрита) ліцензія">Пропрієтарна (закрита) ліцензія</option>
                    <option value="Apache License">Apache License</option>
                    <option value="BSD-ліцензія">BSD-ліцензія</option>
                    <option value="MIT License">MIT License</option>
                    <option value="Public Domain">Public Domain</option>
                </select>
            </div>
            <textarea name="description" placeholder="опис" className={inputStyle} onChange={handleChange}/>
            <div className="flex justify-center gap-2">
                <label className="text-xs text-gray-600 font-bold mt-2">термін закчнчення ліцензії:</label>
                <ReactDatePicker className={inputStyle} value={moment(formData.expirationDate).format('YYYY-MM-DD')} onChange={handleDateChange}/>
            </div>
            <div className="flex w-full">
                <input name="licenseId" placeholder="код ліцензії (якщо є)" type="text" className={inputStyle + " w-full"} onChange={handleChange}/>
            </div>
            <div className="flex justify-center">
                <HardwarePicker className={horizontalSelectionPlateStyle} label="Пристрій (якщо є)" defaultValue={formData.hardware} closeAfterSubmit onChange={handleHardwareSelect}/>
            </div>
            <div className="flex justify-center">
                <button type="button" onClick={handleSubmit} className={submitButtonStyle}>додати</button>
            </div>
        </form>
        </div>
}