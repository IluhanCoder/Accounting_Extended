import Departament, { DepartamentResponse } from "../departament/departament-types"
import User from "../user/user-types"

type RegCredantials = {
    role: string,
    edit: boolean,
    nickname: string,
    name: string,
    surname: string,
    lastname: string,
    admin?: User,
    workTime: number,
    departament?: DepartamentResponse,
    password: string,
    pswSubmit?: string
}

export default RegCredantials

export type LoginCredentials = {
    nickname: string,
    password: string
}