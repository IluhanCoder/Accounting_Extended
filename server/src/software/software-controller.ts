import { Request, Response } from "express";
import softwareService from "./software-service";

export default new class SoftwareController {
    async createNewSoftware(req: Request, res: Response) {
        try {
            const {data} = req.body;
            await softwareService.createNewSoftware(data);
            res.status(200).send({
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

    async fetchSoftware(req: Request, res: Response) {
        try {
            const software = await softwareService.fetchSoftware();
            res.status(200).send({
                status: "success",
                software
            })
        } catch (error) {
            res.json({
                status: "fail",
                message: "internal server error"
            }).status(500)
            console.log(error);
        }
    }

    async getHardwareSoftware(req: Request, res: Response) {
        try {
            const {hardwareId} = req.params;
            const software = await softwareService.getHardwareSoftware(hardwareId);
            res.status(200).send({
                status: "success",
                software
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