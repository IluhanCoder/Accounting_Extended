import mongoose from "mongoose";

const softwareSchema = new mongoose.Schema({
    name: String,
    type: String,
    description: String,
    expirationDate: Date,
    licenseId: String || null,
    hardware: mongoose.Types.ObjectId || null
})

export default mongoose.model("Software", softwareSchema);