import { Link, useNavigate } from "react-router-dom";
import { submitButtonStyle } from "../styles/button-syles";
import { inputStyle, linkStyle, staticFormStyle } from "../styles/form-styles";
import { LoginCredentials } from "./registration-types";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import authService from "./auth-service";
import userStore from "../user/user-store";
import { observer } from "mobx-react";

function LoginPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<LoginCredentials>({
        nickname: "",
        password: ""
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
    };    

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if((formData.nickname?.length === 0 || formData.password?.length === 0)) {
            toast.error("Всі поля мають бути заповнені");
            return;
        }

        const result = await authService.login(formData);

        if(result?.status === "success") { 
            navigate((userStore.user?.role === "main") ? "/search" : "/personal-hardware");
            toast("вітаємо в системі!");
        }
    }

    return <div className="flex justify-center pt-24">
        <form className={staticFormStyle} onSubmit={handleSubmit}>
            <div>
                <label>вхід в систему</label>
            </div>
            <div className="flex flex-col gap-2 py-2">
                <div className="flex flex-col gap-2 px-10">
                    <label className="font-bold text-gray-600 text-xs">Псевдонім користувача</label>
                    <input className={`${inputStyle} w-42`} type="text" onChange={handleChange} name="nickname"/>
                </div>
                <div className="flex flex-col gap-2 px-10">
                    <label className="font-bold text-gray-600 text-xs">Пароль</label>
                    <input className={inputStyle} type="password" onChange={handleChange} name="password"/>
                </div>
            </div>
            <div className="flex justify-center w-full">
                <div>
                    <button type="submit" className={submitButtonStyle}>Увійти</button>
                </div>
            </div>
        </form>
    </div>
}

export default observer(LoginPage);