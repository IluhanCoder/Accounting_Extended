import mongoose from "mongoose";

export interface ModificationRequest{
    requester: mongoose.Types.ObjectId,
    hardware: mongoose.Types.ObjectId,
    reason: string,
    chars: string,
    crit: string,
    date: Date,
    admin: mongoose.Types.ObjectId
}

export interface ServiceRequest {
    requester: mongoose.Types.ObjectId,
    hardware: mongoose.Types.ObjectId,
    problem: string,
    crit: string,
    date: Date,
    admin: mongoose.Types.ObjectId
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
    },
    user: mongoose.Types.ObjectId | null,
    crit: string,
    status: string,
    admin: mongoose.Types.ObjectId,
    requestTo: mongoose.Types.ObjectId,
    date: Date
}