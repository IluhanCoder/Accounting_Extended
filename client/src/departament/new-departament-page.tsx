import { FormEvent, useState } from "react";
import Departament from "./departament-types";
import departamentService from "./departament-service";
import { redButtonSyle, submitButtonStyle } from "../styles/button-syles";
import { inputStyle, staticFormContainerStyle, staticFormStyle } from "../styles/form-styles";
import User from "../user/user-types";
import UserPicker from "../user/user-picker";
import { toast } from "react-toastify";

function NewDepartamentPage() {
    const [formData, setFormData] = useState<Departament>({
        name: "",
        users: []
    });

    const handleUserPush = (name: string, user: User | null) => {
        if(!user) return;
        if(formData.users.find((userItem: User) => userItem._id === user._id)) {
            toast.error("ви вже додали цього користувача");
            return;
        }
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

    return <div className={staticFormContainerStyle}>
        <form className={staticFormStyle} onSubmit={handleSubmit}>
            <div className="flex justify-center">
                <h1 className="text-2xl">створення нового відділу</h1>
            </div>
            <div className="flex flex-col gap-2 py-2">
                <div className="flex flex-col gap-2 px-10">
                    <input placeholder="назва нового відділу" className={inputStyle} type="text" onChange={(e) => { setFormData({...formData, name: e.target.value}) }} name="name"/>
                </div>
            </div>
            <div className="flex flex-col border rounded p-2">
                <div className="flex justify-center py-4">
                    <UserPicker pusherMode label="співробітники відділу" onChange={handleUserPush} self/>
                </div>
                <div className="max-h-72 overflow-auto">
                    {formData.users.length > 0 && <div className="flex gap-2 flex-wrap">{formData.users.map((user: User) => 
                        <div className="flex justify-between py-4 px-6 border rounded gap-4 max-w-1/2">
                            <div className="mt-1 overflow-auto">{`${user.nickname} (${user.name} ${user.surname})`}</div>
                            <div>
                                <button type="button" onClick={() => handleUserPop(user)} className={redButtonSyle}>прибрати</button>
                            </div>
                        </div>
                    )}</div> || <div className="flex justify-center text-gray-600 p-10">ви не додали користувачів</div>}
                </div>
            </div>
            <div className="flex w-full mt-4 justify-center">
                <button type="submit" className={submitButtonStyle}>Створити</button>
            </div>
        </form>
    </div>
}

export default NewDepartamentPage;