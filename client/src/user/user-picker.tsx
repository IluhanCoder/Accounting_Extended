import stringHelper from "../misc/string-helper";
import SelectionPlate from "../selection/selection-plate";
import userService from "./user-service";
import userStore from "./user-store";
import User from "./user-types";

interface LocalParams {
    onChange: (name: string, value: User | null) => void,
    label?: string,
    closeAfterSubmit?: boolean,
    role?: string,
    self?: boolean,
    className?: string,
    pusherMode?: boolean
}

function UserPicker({onChange, label, closeAfterSubmit, role, self, className, pusherMode}: LocalParams) {
    const getUsers = async (): Promise<User[]> => {
        return (await userService.fetchUsers(undefined, undefined)).users;
    }

    const usersDisplayField = (user: User) => `${user.nickname} (${user.name} ${user.surname})`

    const userFilterField = (user: User, value: string) => {
        const isSelf = self ? userStore.isCurrentUser(user) : true;
        const matchesRole = role ? user.role === role : true;
        const namesMatches = stringHelper.unstrictCompare(user.nickname, value) || stringHelper.unstrictCompare(user.name, value) || stringHelper.unstrictCompare(user.surname, value) || stringHelper.unstrictCompare(user.lastname, value);

        return isSelf && matchesRole && namesMatches;
    }

    return <SelectionPlate<User> pusherMode={pusherMode} className={className ?? "flex gap-4 px-4 py-1"} searchPanelLabel="нікнейм, імʼя, прізвище, або по-батькові" filterField={userFilterField} closeAfterSubmit name="user" displayField={usersDisplayField} fetchData={getUsers} label={label} onChange={onChange}/>
}

export default UserPicker