import { useState } from "react";
import FormComponent from "../forms/form-component";
import { submitButtonStyle } from "../styles/button-syles";
import hardwareService from "./hardware-service";
import { toast } from "react-toastify";
import formStore from "../forms/form-store";
import { inputStyle } from "../styles/form-styles";

interface LocalParams {
    category: string,
    onSubmit?: () => void
}

export default function NewTypeForm ({category, onSubmit}: LocalParams) {
    const [name, setName] = useState<string>("");

    const handleSubmit = async () => {
        try {
            await hardwareService.createNewType(name, category);
            toast.success("новий тип успішно додано");
            formStore.dropForm();
            if(onSubmit) onSubmit();
        } catch (error: any) {
            if(error.code === "ERR_BAD_REQUEST") {
                toast.error(error?.response?.data?.message);
            }
        }
    }

    return <FormComponent className="flex gap-4 p-4 flex-col w-1/3" formLabel="новий тип обладнання">
        <div className="flex flex-col gap-2">
            <div className="flex justify-center">
                <input className={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="назва"/>
            </div>
            <div className="flex justify-center">
                <button onClick={handleSubmit} className={submitButtonStyle}>створити</button>
            </div>
        </div>
    </FormComponent>
}