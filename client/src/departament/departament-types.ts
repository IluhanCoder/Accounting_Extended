import User from "../user/user-types";

export default interface Departament {
    name: string,
    users: User[]
}

export interface DepartamentResponse extends Departament {
    _id: string
}