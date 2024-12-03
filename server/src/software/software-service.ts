import mongoose from "mongoose";
import softwareModel from "./software-model";
import Software, { SoftwareResponse } from "./software-types";

export default new class SoftwareService {
    mainAggregation = [
        {
            $lookup: {
              from: 'hardware',
              localField: 'hardware',
              foreignField: '_id',
              as: 'hardwareDetails'
            }
          },
          {
            $unwind: {
              path: '$hardwareDetails',
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $project: {
              name: 1,
                type: 1,
                expirationDate: 1,
                description: 1,
                licenseId: 1
            }
          }
    ]

    async createNewSoftware(softwareData: Software) {
        await softwareModel.create(softwareData);
    }

    async fetchSoftware(): Promise<SoftwareResponse[]> {
        return await softwareModel.aggregate(this.mainAggregation);
    }

    async getHardwareSoftware(hardwareId: string): Promise<SoftwareResponse[]> {
        const convertedId = new mongoose.Types.ObjectId(hardwareId);
        return await softwareModel.aggregate([
            {
                $match: {
                    hardware: convertedId
                }     
            },
            ...this.mainAggregation
        ]);
    }
}