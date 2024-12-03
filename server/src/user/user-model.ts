import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    nickname: {
      type: String,
      unique: true
    },
    name: {
      type: String
    },
    surname: {
      type: String
    },
    lastname: {
      type: String
    },
    admin: {
      type: mongoose.Types.ObjectId,
      required: false
    },
    workTime: {
      type: Number
    },
    isActive: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      default: "user"
    },
    edit: {
      type: Boolean,
      default: true
    },
    password: {
      type: String,
    }
  });

  userSchema.methods.verifyPassword = async function(password: string) {
    const user = this;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
  };
  
  const UserModel = mongoose.model('User', userSchema);
  
export default UserModel;