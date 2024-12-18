import { Service } from './../../../client/src/hardware/hardware-types';
import mongoose from "mongoose"
import { DepartamentResponse } from "../departament/departament-types"
import { UserResponse } from "../user/user-type"

export default interface Hardware {
    _id: string,
    category: string,
    type: string,
    price: number,
    serial: string,
    model: string,
    year: string,
    exp_start: Date,
    chars: string,
    departament: mongoose.Types.ObjectId,
    user: mongoose.Types.ObjectId,
    power: number,
    service: {
        date: Date,
        service: String
    }[],
    nextService: Date,
    admin: mongoose.Types.ObjectId,
    modification: string,
    utilization?: {
        date: Date,
        charge: mongoose.Types.ObjectId,
        sell: Boolean
    } | undefined
}

export interface HardwareResponse {
    category: string,
    type: string,
    serial: string,
    model: string,
    price: number,
    year: number,
    exp_start: Date,
    chars: string,
    departament: DepartamentResponse,
    user: UserResponse | undefined,
    service: Service[],
    nextService: Date,
    admin: UserResponse,
    power: number,
    modification: string,
    utilization?: {
        date: Date,
        charge: UserResponse,
        sell: Boolean
    } | undefined
}

export interface IpHardware extends Hardware {
    ip: [string | undefined],
    user: mongoose.Types.ObjectId | undefined
}

export interface Instruction {
    hardwareId: string,
    filePath: string
}