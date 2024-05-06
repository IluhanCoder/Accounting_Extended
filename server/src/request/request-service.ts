import mongoose from "mongoose";
import { hardwareRequestModel, modificationRequestModel, serviceRequestModel } from "./request-models";
import { HardwareRequest, ModificationRequest, ServiceRequest } from "./request-types";

export default new class RequestService {
    async createModificationRequest(modificationRequest: ModificationRequest) {
        await modificationRequestModel.create(modificationRequest);
    }

    async createServiceRequest(serviceRequest: ServiceRequest) {
        await serviceRequestModel.create(serviceRequest);
    }

    async createHardwareRequest(hardwareRequest: HardwareRequest) {
        await hardwareRequestModel.create(hardwareRequest);
    }

    hardwareLookupQuery = [
        {
            $lookup: {
                from: "users",       // the collection to join
                localField: "user",  // field from the input documents
                foreignField: "_id", // field from the documents of the "from" collection
                as: "userDetails"    // output array field
            }
        },
        {
            $unwind: {             // unwind the array
                path: "$userDetails",
                preserveNullAndEmptyArrays: true // important to preserve HardwareRequests without a user
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "admin",
                foreignField: "_id",
                as: "adminDetails"
            }
        },
        {
            $unwind: "$adminDetails"
        },
        {
            $lookup: {
                from: "users",
                localField: "requestTo",
                foreignField: "_id",
                as: "requestToDetails"
            }
        },
        {
            $unwind: "$requestToDetails"
        },
        {
            $addFields: {
                user: "$userDetails",
                admin: "$adminDetails",
                requestTo: "$requestToDetails"
            }
        },
        {
            $project: {
                userDetails: 0,    // Remove the temporary fields used for lookup
                adminDetails: 0,
                requestToDetails: 0
            }
        }
    ]

    async getHardwareRequests(userId: string) {
        const requests = await hardwareRequestModel.aggregate([
            {
                $match: {
                    requestTo: new mongoose.Types.ObjectId(userId)
                },
            },
            ...this.hardwareLookupQuery
        ])
        return requests;
    }

    async getHardwareRequestById(id: string) {
        const request = await hardwareRequestModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            ...this.hardwareLookupQuery
        ]); 
        return request[0];
    }

    async deleteHardwareRequest(id: string) {
        await hardwareRequestModel.findByIdAndDelete(id);
    }

    async setSubmitedStatus(id: string) {
        await hardwareRequestModel.findByIdAndUpdate(id, {status: "submited"});
    }

    adminLookupQuery = [
        {
            $lookup: {
                from: "users",
                localField: "requester",
                foreignField: "_id",
                as: "requesterDetails"
            }
        },
        {
            $unwind: {             // unwind the array
                path: "$requesterDetails"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "admin",
                foreignField: "_id",
                as: "adminDetails"
            }
        },
        {
            $unwind: "$adminDetails"
        },
        {
            $addFields: {
                requester: "$requesterDetails",
                admin: "$adminDetails"
            }
        },
        {
            $project: {
                requesterDetails: 0,    // Remove the temporary fields used for lookup
                adminDetails: 0
            }
        }

    ]

    async getAdminModRequests(id: string) {
        const requests = await modificationRequestModel.aggregate([
            {
                $match: {
                    admin: new mongoose.Types.ObjectId(id)
                }
            },
            ...this.adminLookupQuery
        ]);
        return requests;
    }

    async getAdminSerRequests(id: string) {
        const requests = await serviceRequestModel.aggregate([
            {
                $match: {
                    admin: new mongoose.Types.ObjectId(id)
                }
            },
            ...this.adminLookupQuery
        ]);
        return requests;
    }

    async deleteModificationRequest(id: string) {
        await modificationRequestModel.findByIdAndDelete(id);
    }

    async deleteServiceRequest(id: string) {
        await serviceRequestModel.findByIdAndDelete(id);
    }
}