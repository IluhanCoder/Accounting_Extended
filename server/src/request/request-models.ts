import mongoose from "mongoose";

const modificationRequestSchema = new mongoose.Schema({
    requester: mongoose.Types.ObjectId,
    hardware: mongoose.Types.ObjectId,
    reason: String,
    chars: String,
    crit: String,
    date: Date,
    admin: mongoose.Types.ObjectId
})

export const modificationRequestModel = mongoose.model("ModificationRequest", modificationRequestSchema);

const serviceRequestSchema = new mongoose.Schema({
    requester: mongoose.Types.ObjectId,
    hardware: mongoose.Types.ObjectId,
    problem: String,
    crit: String,
    date: Date,
    admin: mongoose.Types.ObjectId
})

export const serviceRequestModel = mongoose.model("ServiceRequest", serviceRequestSchema);

const hardwareRequestSchema = new mongoose.Schema({
    category: String,
    type: String,
    model: String,
    chars: String,
    purpose: String,
    rent: {
        startDate: Date,
        endDate: Date
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: false
    },
    crit: String,
    status: String,
    admin: mongoose.Types.ObjectId,
    requestTo: mongoose.Types.ObjectId,
    date: Date
})

export const hardwareRequestModel = mongoose.model("HardwareRequest", hardwareRequestSchema);