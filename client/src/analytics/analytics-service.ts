import $api from "../axios-setup";
import { PowerResponse } from "./analytics-types";

export default new class AnalyticsService {
    async calculatePower(startDate: Date, endDate: Date): Promise<{status: string, result: PowerResponse[]}> {
        return (await $api.post("/power-statistics", {startDate, endDate})).data;
    }
}