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
    pusherMode?: boolean,
    defaultValue?: User
}

function UserPicker({onChange, label, defaultValue, closeAfterSubmit, role, self, className, pusherMode}: LocalParams) {
    const getUsers = async (): Promise<User[]> => {
        return (await userService.fetchUsers(self, role)).users;
    }

    const usersDisplayField = (user: User) => `${user.nickname} (${user.name} ${user.surname})`

    const userFilterField = (user: User, value: string | null) => {
        const selfFilter = self ? true : !userStore.isCurrentUser(user);
        const namesMatches = value ? (stringHelper.unstrictCompare(user.nickname, value) || stringHelper.unstrictCompare(user.name, value) || stringHelper.unstrictCompare(user.surname, value) || stringHelper.unstrictCompare(user.lastname, value)) : true;

        return selfFilter && namesMatches;
    }

    return <SelectionPlate<User> defaultValue={defaultValue} pusherMode={pusherMode} className={className ?? "flex gap-4 px-4 py-1"} searchPanelLabel="нікнейм, імʼя, прізвище, або по-батькові" filterField={userFilterField} closeAfterSubmit name="user" displayField={usersDisplayField} fetchData={getUsers} label={label} onChange={onChange}/>
}

export default UserPicker