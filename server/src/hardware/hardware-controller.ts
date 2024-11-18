import { Request, Response } from "express";
import hardwareService from "./hardware-service";
import instructionModel from "./instruction-model";
import mongoose from "mongoose";
import { Instruction } from "./hardware-types";
import HardwareError from "./hardware-errors";

export default new class HardwareController {
    async createHardware(req: Request, res: Response) {
        try {
            const {hardware} = req.body;
            await hardwareService.createHardware(hardware);
            res.status(200).json({
                status: "success"
            })
        } catch (error) {
            res.json({
                status: "fail",
                message: "internal server error"
            }).status(500)
            console.log(error);
        }
    }

    async getHardwareById(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const hardware = await hardwareService.getHardwareById(id);
            res.status(200).json({
                status: "success",
                hardware
            })
        } catch (error) {
            res.json({
                status: "fail",
                message: "internal server error"
            }).status(500)
            console.log(error);
        }
    }

    async filterHardware(req: Request, res: Response) {
        try {
            const {query} = req.body;
            const hardware = await hardwareService.filterHardware(query);
            res.status(200).json({
                status: "success",
                hardware
            })
        } catch (error) {
            res.json({
                status: "fail",
                message: "internal server error"
            }).status(500)
            console.log(error);
        }
    }

    async updateHardware(req: Request, res: Response) {
        try {
            const {data} = req.body;
            const {id} = req.params;
            await hardwareService.editHardware(id, data);
            res.status(200).json({
                status: "success"
            })
        } catch (error) {
            res.json({
                status: "fail",
                message: "internal server error"
            }).status(500)
            console.log(error);
        }
    }

    async uploadInstruciton(req: Request, res: Response) {
        try {
            const file = req.file;
            const {hardwareId} = req.params;
            await hardwareService.uploadInstruction(hardwareId, file.path);
            res.status(200).json({
                status: "success"
            })
        } catch (error) {
            res.json({
                status: "fail",
                message: "internal server error"
            }).status(500)
            console.log(error);
        }
    }

    async downloadInstruction(req: Request, res: Response) {
        try {
            const {hardwareId} = req.params;
            const instructions: Instruction[] = await instructionModel.find({hardwareId: new mongoose.Types.ObjectId(hardwareId as string)});
            if(!instructions[0])  {
                throw HardwareError.NoInstruction();
            }
            console.log(instructions);
            const filePath = __dirname + "/" + instructions[0].filePath;
            res.download(filePath.replace("/src/hardware",""), filePath.split("/").pop());
        } catch (error) {
            if (error instanceof HardwareError) res.status(error.status).json({
                message: error.message,
                status: "bad request"
            }) 
            else {
                res.status(error.status ?? 500).json({
                    status: "internal server error"
                })
                console.log(error);
            }
        }
    }

    async modernize(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const {newChars} = req.body;
            await hardwareService.modernize(id, newChars);
            res.status(200).json({
                status: "success"
            })
        } catch (error) {
            if (error instanceof HardwareError) res.status(error.status).json({
                message: error.message,
                status: "bad request"
            }) 
            else {
                res.status(error.status ?? 500).json({
                    status: "internal server error"
                })
                console.log(error);
            }
        }
    }

    async deleteById(req: Request, res: Response) {
        try {
            const {id} = req.params;
            await hardwareService.deleteById(id);
            res.status(200).json({
                status: "success"
            })
        } catch (error) {
            if (error instanceof HardwareError) res.status(error.status).json({
                message: error.message,
                status: "bad request"
            }) 
            else {
                res.status(error.status ?? 500).json({
                    status: "internal server error"
                })
                console.log(error);
            }
        }
    }

    async sell(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const {comment} = req.body;
            await hardwareService.sell(id, comment);
            res.status(200).json({
                status: "success"
            })
        } catch (error) {
            res.json({
                status: "fail",
                message: "internal server error"
            }).status(500)
            console.log(error);
        }
    }

    async getSelledHardware(req: Request, res: Response) {
        try {
            const hardware = await hardwareService.getSelledHardware();
            res.status(200).json({
                status: "success",
                hardware
            })
        } catch (error) {
            res.json({
                status: "fail",
                message: "internal server error"
            }).status(500)
            console.log(error);
        }
    }
}