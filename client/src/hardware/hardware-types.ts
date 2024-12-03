import moment from "moment";
import Departament, { DepartamentResponse } from "../departament/departament-types";
import User, { UserResponse } from "../user/user-types";
import { HardwareFormError } from "./hardware-error";

export const Categories = [
    {value: "per", label: "переферійне обладнання"},
    {value: "comp", label: "компʼютерне обладнання"},
    {value: "net", label: "мережеве обладнання"}
]

export default interface Hardware {
    category: string,
    type: string,
    serial: string,
    model: string,
    power: number,
    year: number,
    exp_start: Date,
    chars: string,
    departament: string,
    user: string | undefined,
    service: Service[],
    nextService: Date,
    admin: string,
    modification: string | undefined,
    utilization?: {
        date: Date,
        charge: string,
        sell: boolean
    } | null
}

export interface Service {
    date: Date,
    service: string
}

export interface HardwareResponse {
    _id: string,
    category: string,
    type: string,
    serial: string,
    model: string,
    power: number,
    year: number,
    exp_start: Date,
    chars: string,
    departament: DepartamentResponse,
    user: User | undefined,
    service: Service[],
    nextService: Date,
    admin: User,
    ip: string[],
    modification: string | undefined,
    utilization?: {
        date: Date,
        charge: User,
        sell: boolean
    } | null
}

export interface HardwareFormData {
    _id?: string,
    category: string | undefined,
    type: string,
    serial: string,
    model: string,
    power: number,
    year: number,
    exp_start: Date,
    chars: string,
    departament: DepartamentResponse | undefined,
    user: User | undefined,
    service: Service[],
    nextService: Date,
    admin: User | undefined,
    modification: string | undefined,
    utilization: { date: string, charge: User | undefined, sell: boolean } | null,
    ip: string[]
}

export interface SelledHardwareResponse {
    hardware: Hardware,
    date: Date,
    comment: string
}

function hasUndefined(data: HardwareFormData | HardwareResponse): boolean {
    for(const key in data) {
        const field = data[key as keyof (HardwareFormData | HardwareResponse)];
        if(key !== "utilization" && key !== "modification" && key !== "user" && field === undefined) return true;
    }
    return false;
}

export function ConvertHardwareFormToHardware(hardwareFormData: HardwareFormData) {
    if(hasUndefined(hardwareFormData)) throw HardwareFormError.HasUndefined();

    const newHardware: Hardware = {
        ...hardwareFormData,
        type: hardwareFormData.type!,
        category: hardwareFormData.category!,
        departament: hardwareFormData.departament?._id!,
        user: hardwareFormData.user?._id!,
        admin: hardwareFormData.admin?._id!,
        utilization: (hardwareFormData.utilization && hardwareFormData.utilization.charge) ? {
            date: new Date(hardwareFormData.utilization!.date),
            charge: hardwareFormData.utilization?.charge!._id!,
            sell: hardwareFormData.utilization.sell
        } : undefined
    };

    return newHardware;
}

export function ConvertHardwareResToHardwareForm(hardwareData: HardwareResponse | undefined): HardwareFormData | undefined {
    if(hardwareData)
        return {
            ...hardwareData,
            ip: (("ip" in hardwareData) ? hardwareData.ip : []) as string[],
            utilization: {
                charge: hardwareData.utilization?.charge,
                date: moment(hardwareData.utilization?.date).format('YYYY-MM-DD'),
                sell: hardwareData.utilization?.sell!,
            },
            modification: hardwareData.modification,
            type: hardwareData.type
        }
    else return undefined;
}

export interface IpHardware extends Hardware {
    ip: [string | undefined]
}