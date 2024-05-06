import { observer } from "mobx-react";
import { ReactNode } from "react";
import userStore from "../user/user-store";
import LoadingScreen from "./loading-screen";

interface LocalParams {
    roles?: string[],
    edit?: boolean,
    children: ReactNode
}

function AuthGates ({children, roles, edit}: LocalParams) {
    const user = userStore.user;

    if(user === undefined) return <LoadingScreen/>;

    const condition = (roles) ? roles.includes(user?.role ?? "") : ((edit) ? user?.edit : true);

    if(user && condition) return <>{children}</>
    else return <div>
        <div className="text-3xl text-red-700">Дана сторінка недоступна</div>
    </div>
}

export default observer(AuthGates);