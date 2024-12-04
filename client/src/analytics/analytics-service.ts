import $api from "../axios-setup";
import { PowerResponse } from "./analytics-types";

export interface StatisticItem {
    year: number, month: number, day: number, amount: number
}

export interface StatisticsResponse {
    expStatistics: StatisticItem[],
    spendStatistics: StatisticItem[],
    updateStatistics: StatisticItem[]
}   

export default new class AnalyticsService {
    async calculatePower(startDate: Date, endDate: Date): Promise<{status: string, result: PowerResponse[]}> {
        return (await $api.post("/power-statistics", {startDate, endDate})).data;
    }

    async getStatistics(startDate: Date, endDate: Date): Promise<{status: string, result: StatisticsResponse}> {
        return (await $api.post("/statistics", {startDate, endDate})).data;
    }
}