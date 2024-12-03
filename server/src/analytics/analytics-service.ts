import departamentModel from "../departament/departament-model";
import Departament from "../departament/departament-types";
import hardwareModel from "../hardware/hardware-model";
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
}