import mongoose from "mongoose";

const instructionSchema = new mongoose.Schema({
    filePath: String,
    hardwareId: mongoose.Types.ObjectId
})

export default mongoose.model("Instruction", instructionSchema);