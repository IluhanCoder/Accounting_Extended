import { Request, Response } from "express";
import departamentService from "./departament-service";

export default new class DepartamentController {
    async createDepartament(req: Request, res: Response) {
        try {
            const {name, userIds} = req.body;
            await departamentService.createDepartament(name, userIds);
            return res.status(200).json({
                status: "success"
            });
        } catch (error) {
            res.json({
                status: "fail",
                message: "internal server error"
            }).status(500)
            console.log(error);
        }
    }

    async pushUser(req: Request, res: Response) {
        try {
            const {departamentId} = req.params;
            const {userId} = req.body;
            await departamentService.pushUser(departamentId, userId);
            return res.status(200).json({
                status: "success"
            });
        } catch (error) {
            res.json({
                status: "fail",
                message: "internal server error"
            }).status(500)
            console.log(error);
        }
    }

    async fetchDepartaments(req: Request, res: Response) {
        try {
            const departaments = await departamentService.fetchDepartaments();
            return res.status(200).json({
                status: "success",
                departaments
            });
        } catch (error) {
            res.json({
                status: "fail",
                message: "internal server error"
            }).status(500)
            console.log(error);
        }
    }
}