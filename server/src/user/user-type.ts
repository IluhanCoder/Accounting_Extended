import mongoose from "mongoose"

type User = {
    _id?: string,
    nickname: string,
    name: string,
    role: string,
    surname: string,
    lastname: string,
    admin?: mongoose.Types.ObjectId,
    workTime: number,
    isActive: boolean,
    edit: boolean,
    password: string
}

export default User

export interface UserResponse {
    _id: string,
    nickname: string,
    name: string,
    role: string,
    surname: string,
    lastname: string,
    admin?: mongoose.Types.ObjectId,
    workTime: number,
    edit: boolean,
    isActive: boolean,
}