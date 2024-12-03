import mongoose from "mongoose";

const typeSchema = new mongoose.Schema({
    type: { value: String, label: String },
    category: String
})

export default mongoose.model("Type", typeSchema);