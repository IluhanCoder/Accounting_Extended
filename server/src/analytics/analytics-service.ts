import { SelledHardwareResponse } from "../../../client/src/hardware/hardware-types";
import departamentModel from "../departament/departament-model";
import Departament from "../departament/departament-types";
import hardwareModel, { selledModel, updateLogModel } from "../hardware/hardware-model";
import Hardware from "../hardware/hardware-types";
import UserModel from "../user/user-model";

export default new class AnalyticsService {
    getWeeksBetween = (startDate: Date, endDate: Date) => {
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        const timeDiff = end - start;
        const weeks = timeDiff / (1000 * 60 * 60 * 24 * 7);
        return weeks;
    };

    async calculatePower(startDate: Date, endDate: Date) {
        const weeksInRange = this.getWeeksBetween(startDate, endDate);
    
        // Step 1: Fetch all hardware in use
        const hardwareList: Hardware[] = await hardwareModel.find().populate('user departament');
    
        // Step 2: Create a map to store power usage by department
        const departmentPowerMap = new Map();
    
        // Step 3: Iterate over each hardware item
        for (const hardware of hardwareList) {
            let workTime = 60; // Default work time for hardware with no user
    
        // Check if the hardware has an associated user and retrieve their work time
            if (hardware.user) {
            const user = await UserModel.findById(hardware.user);
            if (user && user.workTime) {
                    workTime = user.workTime;
                }
            }
    
            // Calculate power usage based on the workTime
            const weeklyPowerUsage = hardware.power * workTime
            const totalPowerUsage = weeklyPowerUsage * weeksInRange;
    
            // Add the power usage to the department
            const departmentId = hardware.departament.toString();
            const departamentData: Departament = await departamentModel.findById(departmentId);
    
            if (!departmentPowerMap.has(departmentId)) {
                departmentPowerMap.set(departmentId, {
                    departament: departamentData,
                    power: 0
                });
            }
    
            departmentPowerMap.get(departmentId).power += parseFloat(totalPowerUsage.toFixed(2));
        }
    
        return Array.from(departmentPowerMap.values());
    }

    async CalculateExpStatistics(startDate: Date, endDate: Date) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        // Отримуємо все обладнання, введене в експлуатацію до кінцевої дати
        const hardwareList = await hardwareModel.find({
            exp_start: { $lte: end }  // Обладнання, яке почало експлуатацію до endDate
        });
    
        // Функція для створення ключа дати (рік, місяць, день)
        const createDateKey = (date: Date) => ({
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        });
    
        // Ініціалізуємо статистику за кожен день у діапазоні
        let statistics: { year: number, month: number, day: number, amount: number }[] = [];
    
        // Проходимо по всім дням в діапазоні
        for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
            let count = 0;
            const currentDate = new Date(date);
    
            // Перевіряємо кожне обладнання
            hardwareList.forEach(hardware => {
                const utilizationDate = hardware.utilization?.date; // Дата утилізації, якщо є
                const isUtilized = utilizationDate && utilizationDate < currentDate; // Якщо обладнання утилізовано до поточної дати
    
                // Якщо обладнання введене в експлуатацію та не утилізоване на поточну дату
                if (hardware.exp_start <= currentDate && (!isUtilized || utilizationDate === undefined)) {
                    count++;
                }
            });
    
            // Додаємо запис у статистику за поточний день
            statistics.push({ 
                ...createDateKey(currentDate), 
                amount: count 
            });
        }

        return statistics;
    }

    async CalculateSpendStatistics(startDate: Date, endDate: Date) {
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        // Get all hardware that started exploitation before the end date
        const hardwareList: Hardware[] = await hardwareModel.find({
            exp_start: { $lte: end }
        });
    
        // Get all sold hardware before the end date
        const selledHardwareList: SelledHardwareResponse[] = await selledModel.find({
            date: { $lte: end }
        });
    
        // Helper function to create date key
        const createDateKey = (date: Date) => ({
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        });
    
        // Initialize statistics array
        let statistics: { year: number, month: number, day: number, amount: number }[] = [];
    
        // Initialize variable for accumulated spending
        let accumulatedSpending = 0;
    
        // Loop through all days in the range
        for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
            const currentDate = new Date(date);
    
            // Add price for hardware that started before or on the current date and is not yet sold
            hardwareList.forEach(hardware => {
                if (hardware.exp_start.getDate() === currentDate.getDate() && hardware.exp_start.getMonth() === currentDate.getMonth() && hardware.exp_start.getFullYear() === currentDate.getFullYear() && typeof hardware.price === "number" && !isNaN(hardware.price)) {
                    accumulatedSpending += hardware.price;
                }
            });

            selledHardwareList.forEach(hardware => {
                // If not sold or sold after the current date
                if(hardware.hardware.exp_start.getTime() < currentDate.getTime()) {
                    if (hardware.hardware.exp_start.getDate() === currentDate.getDate() && hardware.hardware.exp_start.getMonth() === currentDate.getMonth() && hardware.hardware.exp_start.getFullYear() === currentDate.getFullYear()) {
                        if (hardware.hardware.exp_start <= currentDate && typeof hardware.hardware.price === "number" && !isNaN(hardware.hardware.price)) {
                            accumulatedSpending += hardware.hardware.price;
                        }
                    }
                    else if (hardware.date.getDate() === currentDate.getDate() && hardware.date.getMonth() === currentDate.getMonth() && hardware.date.getFullYear() === currentDate.getFullYear()) accumulatedSpending -= hardware.hardware.price;
                }
            });
    
            // Add current statistics for the day
            statistics.push({
                ...createDateKey(currentDate),
                amount: parseFloat(accumulatedSpending.toFixed(2)) // Fixed to 2 decimal places
            });
        }
    
        return statistics;
    }
    
    async CalculateUpdateStatistics(startDate: Date, endDate: Date) {
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        // Get all update logs between the start date and end date
        const updateLogs = await updateLogModel.find({
            date: { $gte: start, $lte: end }
        });
    
        // Helper function to create a key for each date (year, month, day)
        const createDateKey = (date: Date) => ({
            year: date.getFullYear(),
            month: date.getMonth() + 1, // Months are 0-indexed, so we add 1
            day: date.getDate()
        });
    
        // Initialize a statistics array for storing the number of updates per day
        let statistics: { year: number, month: number, day: number, amount: number }[] = [];
    
        // Loop through each day in the range
        for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
            const currentDate = new Date(date);
    
            // Filter updates that happened on the current date
            const updatesForCurrentDay = updateLogs.filter(
                log => log.date.getDate() === currentDate.getDate() &&
                       log.date.getMonth() === currentDate.getMonth() &&
                       log.date.getFullYear() === currentDate.getFullYear()
            );
    
            // Push the statistics for the current date
            statistics.push({
                ...createDateKey(currentDate),
                amount: updatesForCurrentDay.length // Count of updates for this day
            });
        }

        console.log(statistics);
    
        return statistics;
    }
    
}