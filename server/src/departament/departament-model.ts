import mongoose from "mongoose";

const departamentSchema = new mongoose.Schema({
    name: String,
    users: [mongoose.Types.ObjectId]
})

export default mongoose.model("Departament", departamentSchema);