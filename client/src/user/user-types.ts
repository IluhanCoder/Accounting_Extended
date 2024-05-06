import { DepartamentResponse } from "../departament/departament-types"
import { HardwareResponse } from "../hardware/hardware-types"

type User = {
    _id: string,
    nickname: string,
    name: string,
    role: string,
    surname: string,
    lastname: string,
    admin?: string,
    workTime: string,
    isActive: boolean,
    edit: boolean,
    password: string
}

export default User

export interface UserResponse {
    _id: string,
    nickname: string,
    role: string,
    name: string,
    surname: string,
    lastname: string,
    departament: DepartamentResponse,
    admin?: User,
    workTime: string,
    edit: boolean,
    isActive: boolean
}