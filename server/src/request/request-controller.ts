import { Request, Response } from "express";
import requestService from "./request-service";
import { AuthenticatedRequest } from "../auth/auth-types";

export default new class RequestController {
    async createModificationRequest(req: Request, res: Response) {
        try {
            const {data} = req.body;
            await requestService.createModificationRequest(data);
            res.status(200).json({
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

    async createHardwareRequest(req: Request, res: Response) {
        try {
            const {data} = req.body;
            await requestService.createHardwareRequest(data);
            res.status(200).json({
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

    async createServiceRequest(req: Request, res: Response) {
        try {
            const {data} = req.body;
            await requestService.createServiceRequest(data);
            res.status(200).json({
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

    async getHardwareRequests(req: AuthenticatedRequest, res: Response) {
        try {
            const user = req.user;
            const requests = await requestService.getHardwareRequests(user._id);
            res.status(200).json({
                status: "success",
                requests
            })
        } catch (error) {
            res.json({
                status: "fail",
                message: "internal server error"
            }).status(500)
            console.log(error);
        }
    }

    async deleteHardwareRequest(req: Request, res: Response) {
        try {
            const {id} = req.params;
            await requestService.deleteHardwareRequest(id);
            res.status(200).json({
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

    async getHardwareRequestById(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const request = await requestService.getHardwareRequestById(id);
            res.status(200).json({
                status: "success",
                request
            })
        } catch (error) {
            res.json({
                status: "fail",
                message: "internal server error"
            }).status(500)
            console.log(error);
        }
    }

    async setSubmitedStatus(req: Request, res: Response) {
        try {
            const {id} = req.params;
            await requestService.setSubmitedStatus(id);
            res.status(200).json({
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

    async getAdminModRequests(req: AuthenticatedRequest, res: Response) {
        try {
            const user = req.user;
            const requests = await requestService.getAdminModRequests(user._id);
            res.status(200).json({
                status: "success",
                requests
            })
        } catch (error) {
            res.json({
                status: "fail",
                message: "internal server error"
            }).status(500)
            console.log(error);
        }
    }

    async getAdminSerRequests(req: AuthenticatedRequest, res: Response) {
        try {
            const user = req.user;
            const requests = await requestService.getAdminSerRequests(user._id);
            res.status(200).json({
                status: "success",
                requests
            })
        } catch (error) {
            res.json({
                status: "fail",
                message: "internal server error"
            }).status(500)
            console.log(error);
        }
    }

    async deleteModificationRequest(req: Request, res: Response) {
        try {
            const {id} = req.params;
            await requestService.deleteModificationRequest(id);
            res.status(200).json({
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

    async deleteServiceRequest(req: Request, res: Response) {
        try {
            const {id} = req.params;
            await requestService.deleteServiceRequest(id);
            res.status(200).json({
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