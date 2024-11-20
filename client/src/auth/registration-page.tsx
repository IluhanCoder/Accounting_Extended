import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import RegCredantials from "./registration-types";
import { toast } from "react-toastify";
import authService from "./auth-service";
import { inputStyle, smallInputStyle } from "../styles/form-styles";
import { submitButtonStyle } from "../styles/button-syles";
import { observer } from "mobx-react";
import User from "../user/user-types";
import { DepartamentResponse } from "../departament/departament-types";
import UserPicker from "../user/user-picker";
import userStore from "../user/user-store";

function RegistationPage() {
    const navigate = useNavigate();

    const defaultValues = {
        role: "user",
        edit: true,
        nickname: "",
        name: "",
        surname: "",
        lastname: "",
        admin: undefined,
        departament: undefined,
        workTime: "",
        password: "",
        pswSubmit: ""
    }

    const [formData, setFormData] = useState<RegCredantials>(defaultValues);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
    };    

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if(formData.password !== formData.pswSubmit) {
            toast.error("Пароль та підтвердження паролю мають співпадати");
            return;
        }

        try {
            const result = await authService.registrate(formData);

            if(result?.status === "success") { 
                toast.success("Користувача було успішно створено");
                (document.getElementById("registration-form") as HTMLFormElement).reset();
                setFormData({...formData});
            }
        } catch (error) {
            throw error;
        }
    }

    const handleAdminChange = (name: string, value: User | null) => {
        if(value) setFormData({...formData, admin: value})
    }

    const handleCheckBox = () => {
        setFormData({...formData, edit: !formData.edit})
    }

    return <div className="flex flex-col p-4">
        <div className="flex justify-center">
            <div className="flex justify-center px-12 w-2/3">
                <div className="flex flex-col w-full">
                    <div className="flex justify-center">
                        <h1 className="text-2xl">Додання користувача</h1>
                    </div>
                    <form onSubmit={handleSubmit} id="registration-form">
                        <div className="flex justify-center mt-2">
                            <div className="flex flex-col gap-1 justify-center p-2 w-fit">
                                <select value={formData.role} className={smallInputStyle} name="role" onChange={handleChange}>
                                    <option value="user">користувач</option>
                                    <option value="admin">адміністратор</option>
                                    {userStore.user?.role === "main" && <option value="main">керівник</option>}
                                </select>
                                {formData.role === "user" && <div className="flex gap-2">
                                    <input defaultChecked={true} type="checkbox" onChange={handleCheckBox}/>
                                    <label>право на редагування</label>
                                </div>}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <label className="font-bold text-gray-600 text-xs">Псевдоним</label>
                                <input className={inputStyle} type="text" name="nickname" onChange={handleChange}/>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="font-bold text-gray-600 text-xs">Ім'я</label>
                                <input className={inputStyle} type="text" name="name" onChange={handleChange}/>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="font-bold text-gray-600 text-xs">Прізвище</label>
                                <input className={inputStyle} type="text" name="surname" onChange={handleChange}/>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="font-bold text-gray-600 text-xs">По батькові</label>
                                <input className={inputStyle} type="text" name="lastname" onChange={handleChange}/>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="font-bold text-gray-600 text-xs">Робочий час</label>
                                <input className={inputStyle} type="text" name="workTime" onChange={handleChange}/>
                            </div>
                            {formData.role === "user" && <div className="flex flex-col gap-1 border p-2 rounded">
                                <UserPicker closeAfterSubmit label="відповідальний адміністратор" onChange={handleAdminChange} role="admin" self/>
                                <div className="text-2xl text-center p-2">{formData.admin?.nickname}</div>
                            </div>}
                            <div className="flex flex-col gap-1">
                                <label className="font-bold text-gray-600 text-xs">Пароль</label>
                                <input className={inputStyle} type="password" onChange={handleChange} name="password"/>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="font-bold text-gray-600 text-xs">Підтвердження паролю</label>
                                <input className={inputStyle} type="password" onChange={handleChange} name="pswSubmit"/>
                            </div>
                        </div>
                        <div className="flex justify-center pt-4">
                            <button type="submit" className={submitButtonStyle} onClick={handleSubmit}>Створити</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
}

export default observer(RegistationPage);