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

    async getStatistics(req: Request, res: Response) {
        try {
            const {startDate, endDate} = req.body;
            const expStatistics = await analyticsService.CalculateExpStatistics(startDate, endDate);
            const spendStatistics = await analyticsService.CalculateSpendStatistics(startDate, endDate);
            const updateStatistics = await analyticsService.CalculateUpdateStatistics(startDate, endDate);
            const result = {expStatistics, spendStatistics, updateStatistics};
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