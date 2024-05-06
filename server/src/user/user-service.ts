import mongoose from 'mongoose';
import UserModel from "./user-model";
import User, { UserResponse } from "./user-type";

export default new class UserService {
    async fetchUsers(currentUser: User | undefined, self: boolean, role: string) {
        if(!self && currentUser)
            return await UserModel.find({_id: {$ne: currentUser._id}, role: role ?? "user"});
        else 
            return await UserModel.find({role: role ?? "user"});
    }

    async getUserById(userId: string) {
        const result = await UserModel.findById(userId);
          return result;
    }

    async updateUser(userId: string, newData: UserResponse) {
        await UserModel.findByIdAndUpdate(userId, newData);
    }
}