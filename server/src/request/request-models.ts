import mongoose from "mongoose";

const modificationRequestSchema = new mongoose.Schema({
    requester: mongoose.Types.ObjectId,
    type: String,
    reason: String,
    chars: String,
    crit: String,
    date: Date,
    admin: mongoose.Types.ObjectId
})

export const modificationRequestModel = mongoose.model("ModificationRequest", modificationRequestSchema);

const serviceRequestSchema = new mongoose.Schema({
    requester: mongoose.Types.ObjectId,
    type: String,
    problem: String,
    crit: String,
    date: Date,
    admin: mongoose.Types.ObjectId
})

export const serviceRequestModel = mongoose.model("ServiceRequest", serviceRequestSchema);

const hardwareRequestSchema = new mongoose.Schema({
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