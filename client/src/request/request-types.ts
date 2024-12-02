import Hardware from "../hardware/hardware-types";
import User, { UserResponse } from "../user/user-types";

export interface modificationRequestResponse {
    _id: string
    requester: UserResponse,
    hardware: Hardware,
    reason: string,
    chars: string,
    crit: string,
    date: Date,
    admin: UserResponse
}

export interface modificationRequestCredentials {
    requester: string | undefined,
    hardware: string | undefined,
    reason: string,
    chars: string,
    crit: string,
    admin: User | null
}

export interface serviceRequestResponse {
    _id: string,
    requester: UserResponse,
    hardware: Hardware,
    problem: string,
    crit: string,
    date: Date,
    admin: UserResponse
}

export interface serviceRequestCredentials {
    requester: string | undefined,
    hardware: string | undefined,
    problem: string,
    crit: string,
    admin: User | null
}

export interface hardwareRequestResponse {
    _id: string,
    category: string,
    type: string,
    model: string,
    chars: string,
    purpose: string,
    rent: {
        startDate: Date,
        endDate: Date
    } | null,
    user: User | null,
    crit: string,
    status: string,
    admin: User,
    requestTo: User,
    date: Date
}

export interface hardwareRequestCredentials {
    category: string,
    type: string,
    model: string,
    chars: string,
    purpose: string,
    rent: {
        startDate: Date,
        endDate: Date
    } | null,
    user: User | null,
    crit: string,
    requestTo: User | undefined
}

export interface ModificationRequest{
    requester: string,
    hardware: string,
    reason: string,
    chars: string,
    crit: string,
    date: Date,
    admin: string
}

export interface ServiceRequest {
    requester: string,
    hardware: string,
    problem: string,
    crit: string,
    date: Date,
    admin: string
}

export interface HardwareRequest{
    category: string,
    type: string,
    model: string,
    chars: string,
    purpose: string,
    rent: {
        startDate: Date,
        endDate: Date
    } | null,
    user: string | null,
    crit: string,
    status: string,
    admin: string,
    requestTo: string,
    date: Date
}
