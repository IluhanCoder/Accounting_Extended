import mongoose from "mongoose";
import Hardware from "../hardware/hardware-types";

export default interface Software {
    name: string,
    type: string,
    description: string,
    expirationDate: Date,
    licenseId: string | null,
    hardware: mongoose.Types.ObjectId | null
}

export interface SoftwareResponse {
    name: string,
    type: string,
    description: string,
    expirationDate: Date,
    licenseId: string | null,
    hardware: Hardware | null
}