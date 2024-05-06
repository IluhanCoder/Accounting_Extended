import { config } from 'dotenv';
import express from "express";
import cors from "cors";
import router from './router';
import mongoose from 'mongoose';
import authController from './auth/auth-controller';
import authMiddleware from './auth/auth-middleware';
import authChecker from './auth/auth-checker';
import userController from './user/user-controller';

config();

const PORT = process.env.PORT;
const CLIENT_URL=process.env.CLIENT_URL;
const DB_URL=process.env.DB_URL;

const app = express();

app.use(express.json());

app.use(cors({
    credentials: true,
    origin:CLIENT_URL,
  }))

mongoose.connect(DB_URL);

app.post("/registration", authController.registration);
app.post("/login", authController.login);
app.post("/verify", authController.verifyToken);

app.use(authMiddleware);

app.post("/fetch-users", userController.fetchUsers);

app.use(authChecker);

app.use(router);

app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
  });