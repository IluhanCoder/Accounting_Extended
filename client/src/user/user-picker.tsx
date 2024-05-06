import { useEffect, useState } from "react";
import User from "./user-types";
import userService from "./user-service";
import Picker from "../misc/picker";
import LoadingScreen from "../misc/loading-screen";

interface LocalParams {
    handlePush: (user: User) => void,
    self?: boolean,
    role?: string,
    label: string,
    closeAfterSubit?: boolean
}

function UserPicker ({handlePush, self, role, label, closeAfterSubit}: LocalParams) {
    const [users, setUsers] = useState<User[]>();

    const getData = async () => {
        const res = await userService.fetchUsers(self, role);
        setUsers([...res.users]);
    }

    useEffect(() => { getData() }, []);

    if(users) return <Picker<User> nickName closeAfterSubmit={closeAfterSubit} label={label} data={users} handlePush={handlePush}/>
    else return <LoadingScreen/>
}

export default UserPicker;