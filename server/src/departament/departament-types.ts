import mongoose from "mongoose";

export default interface Departament {
    name: string,
    users: mongoose.Types.ObjectId[]
}

export interface DepartamentResponse extends Departament {
    _id: string
}