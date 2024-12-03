import { toast } from "react-toastify";
import $api from "../axios-setup";
import { HardwareFormError } from "./hardware-error";
import Hardware, { HardwareResponse, IpHardware, SelledHardwareResponse } from "./hardware-types";

export default new class HardwareService {
    checkEmptyStrings(hardware: Hardware | IpHardware) {
        for(const key in hardware) {
            const field = hardware[key as keyof (Hardware | IpHardware)];
            if(key !== "modification" && key !== "_id" && typeof field === "string" && field.length === 0) throw HardwareFormError.HasEmptyStrings();
        }
    }

    async getHardwareById(id: string): Promise<{status: string, hardware: HardwareResponse}> {
        return (await $api.get(`/hardware/${id}`)).data
    }

    async createHardware(hardware: Hardware | IpHardware) {
        this.checkEmptyStrings(hardware);
        await $api.post("/hardware", {hardware});
    }

    async updateHardware(id: string, data: Hardware | IpHardware) {
        this.checkEmptyStrings(data);
        await $api.put(`/hardware/${id}`, {data});
    }

    async filterHardware(query: any[]): Promise<{status: string, hardware: HardwareResponse[]}> {
        return (await $api.post("/filter-hardware", {query})).data;
    }

    async uploadInstruction(hardwareId: string, file: File) {
        const data = new FormData();
        data.append("instruction", file);
        return (await $api.post(`/instruction/${hardwareId}`, data)).data;
    }

    async downloadInstruction(hardwareId: string) {
        try {
            return (await $api.get(`/instruction/${hardwareId}`, { responseType: 'blob' })).data;
        } catch (error: any) {
            console.log(error);
            if(error?.code === "ERR_BAD_REQUEST")  {
                toast.error("не було знайдено іструкцій на цей пристрій");
            }
        }
    }

    async modernize(hardwareId: string, newChars: string) {
        await $api.patch(`/modernize/${hardwareId}`, {newChars});
    }   

    async deleteById(hardwareId: string) {
        await $api.delete(`/hardware/${hardwareId}`);
    }

    async sell(hardwareId: string, comment: string) {
        await $api.post(`/sell/${hardwareId}`, {comment});
    }

    async getSelledHardware(): Promise<{status: string, hardware: SelledHardwareResponse[]}> {
        return (await $api.get("/selled-hardware")).data;
    }

    async createNewType(name: string, category: string): Promise<{status: string}> {
        return await $api.post("/type", {name, category});
    }

    async getTypes(category: string): Promise<{status: string, types: {type: {value: string, label: string}, category: string}[]}> {
        return (await $api.get(`/types/${category}`)).data;
    }
}