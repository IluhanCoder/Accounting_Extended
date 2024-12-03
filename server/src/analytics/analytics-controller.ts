import { Request, Response } from "express";
import analyticsService from "./analytics-service";

export default new class AnalyticsController {
    async calculatePower(req: Request, res: Response) {
        try {
            const {startDate, endDate} = req.body;
            const result = await analyticsService.calculatePower(startDate, endDate);
            res.status(200).json({
                result,
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
}