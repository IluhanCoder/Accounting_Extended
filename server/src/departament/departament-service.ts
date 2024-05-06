import mongoose from "mongoose";
import departamentModel from "./departament-model"

export default new class DepartamentService {
    async createDepartament(name: string, userIds: string[]) {
        const convertedUserIds: mongoose.Types.ObjectId[] = userIds.map((id: string) => 
            new mongoose.Types.ObjectId(id)
        );
        await departamentModel.create({name, users: convertedUserIds});
    }

    async pushUser(departamentId: string, userId: string) {
        const convertedUserId = new mongoose.Types.ObjectId(userId);
        await departamentModel.findByIdAndUpdate(departamentId, {$push: {users: convertedUserId}});
    }

    async fetchDepartaments() {
        return await departamentModel.find();
    }
}