import $api from "../axios-setup";
import SoftwareCredentials, { SoftwareResponse } from "./software-types";

export default new class SoftwareServce {
    async createNewSoftware(data: SoftwareCredentials): Promise<{status: string, software: SoftwareResponse[]}> {
        return (await $api.post("/software", {data: {...data, hardware: data.hardware?._id}})).data;
    }

    async fetchSoftware(): Promise<{status: string, software: SoftwareResponse[]}> {
        return (await $api.get("/software")).data;
    }

    async getHardwareSoftware(hardwareId: string): Promise<{status: string, software: SoftwareResponse[]}> {
        return (await $api.get(`/software/${hardwareId}`)).data;
    }
}