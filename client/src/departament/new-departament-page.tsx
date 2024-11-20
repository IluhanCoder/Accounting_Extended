import { FormEvent, useState } from "react";
import Departament from "./departament-types";
import departamentService from "./departament-service";
import { redButtonSyle, submitButtonStyle } from "../styles/button-syles";
import { inputStyle } from "../styles/form-styles";
import User from "../user/user-types";
import UserPicker from "../user/user-picker";
import { toast } from "react-toastify";

function NewDepartamentPage() {
    const [formData, setFormData] = useState<Departament>({
        name: "",
        users: []
    });

    const handleUserPush = (name: string, user: User | null) => {
        if(user && !formData.users.includes(user))
            setFormData({name: formData.name, users: [...formData.users, user]});
    }

    const handleUserPop = (user: User) => {
        const tempUsers = formData.users;
        tempUsers.splice(tempUsers.indexOf(user), 1);
        setFormData({...formData, users: tempUsers});
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if(formData.users.length === 0) { toast.error("в відділі має бути хочаб один користувач"); return; }
        if(formData.name.length === 0) { toast.error("відділ повинен мати назву"); return; }
        const userIds = formData.users.map((user: User) => user._id);
        toast("обробка запиту");
        await departamentService.createDepartament(formData.name, userIds);
        toast.success("новий відділ було успішно створено");
    }

    return <div className="p-6">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 py-2">
                <div className="flex flex-col gap-2 px-10">
                    <label className="font-bold text-gray-600 text-xs">назва відділу</label>
                    <input className={inputStyle} type="text" onChange={(e) => { setFormData({...formData, name: e.target.value}) }} name="name"/>
                </div>
            </div>
            <div className="flex flex-col border rounded p-2">
                <div className="flex flex-col gap-2 py-2">
                    <UserPicker label="співробітники відділу" onChange={handleUserPush} self/>
                </div>
                <div className="flex gap-2 flex-wrap">{formData.users.map((user: User) => 
                    <div className="flex justify-between py-2 px-4 border rounded gap-4">
                        <div className="text-xl">{user.nickname}</div>
                        <div>
                            <button type="button" onClick={() => handleUserPop(user)} className={redButtonSyle}>прибрати</button>
                        </div>
                    </div>
                )}</div>
            </div>
            <div className="flex w-full mt-4 justify-between gap-10">
                <div>
                    <button type="submit" className={submitButtonStyle}>Створити</button>
                </div>
            </div>
        </form>
    </div>
}

export default NewDepartamentPage;