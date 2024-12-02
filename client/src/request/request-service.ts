import $api from '../axios-setup';
import { HardwareRequest, ModificationRequest, ServiceRequest, hardwareRequestResponse, modificationRequestResponse, serviceRequestResponse } from './request-types';

export default new class RequestService {
    async createHardwareRequest(data: HardwareRequest) {
        await $api.post("/hardware-request", {data});
    }

    async createServiceRequest(data: ServiceRequest) {
        console.log(data);
        await $api.post("/service-request", {data});
    }

    async createmodificationRequest(data: ModificationRequest) {
        await $api.post("/modification-request", {data});
    }

    async getHardwareRequests(): Promise<{status: string, requests: hardwareRequestResponse[]}> {
        return (await $api.get("/hardware-requests")).data;
    }

    async deleteHardwareRequests(id: string) {
        await $api.delete(`/hardware-request/${id}`);
    }

    async getHardwareRequestById(id: string): Promise<{status: string, request: hardwareRequestResponse}> {
        return (await $api.get(`/hardware-request/${id}`)).data;
    }

    async submitHardwareRequest(id: string) {
        return (await $api.patch(`/submit-hardware/${id}`)).data;
    }

    async getAdminModRequests(): Promise<{status: string, requests: modificationRequestResponse[]}> {
        return (await $api.get("/mod-requests")).data;
    }

    async getAdminSerRequests(): Promise<{status: string, requests: serviceRequestResponse[]}> {
        return (await $api.get("/ser-requests")).data;
    }

    async deleteModificationRequest(id: string, text: string) {
        await $api.put(`/modification-request/${id}`, {text});
    }

    async deleteServiceRequest(id: string, text: string) {
        await $api.put(`/service-request/${id}`, {text});
    }
}


