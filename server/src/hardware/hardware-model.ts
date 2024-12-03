import mongoose from "mongoose";

const hardwareSchema = new mongoose.Schema({
    category: String,
    type: String,
    serial: String,
    model: String,
    year: String,
    exp_start: Date,
    chars: String,
    power: Number,
    departament: mongoose.Types.ObjectId,
    user: mongoose.Types.ObjectId || undefined,
    service: [{
        date: Date,
        service: String
    }],
    nextService: Date,
    admin: mongoose.Types.ObjectId,
    modification: { 
        type: String,
        required: false
    },
    utilization: { type: {
        date: Date,
        charge: mongoose.Types.ObjectId,
        sell: Boolean
    }, required: false},
    ip: {
        type: [String],
        required: false
    }
})

export default mongoose.model("Hardware", hardwareSchema);

const selledSchema = new mongoose.Schema({
    hardware: hardwareSchema,
    date: Date,
    comment: String
})

export const selledModel = mongoose.model("SelledHardware", selledSchema);