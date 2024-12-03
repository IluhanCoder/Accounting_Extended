import mongoose from "mongoose";
import hardwareModel, { selledModel } from "./hardware-model";
import Hardware, { HardwareResponse, IpHardware } from "./hardware-types";
import instructionModel from "./instruction-model";
import { modificationRequestModel, serviceRequestModel } from "../request/request-models";
import typeModel from "./type-model";
import TYPE_OPTIONS from "./type-options";
import HardwareError from "./hardware-errors";

const lookupQuery = [
  {
    $lookup: {
      from: 'users',
      localField: 'user',
      foreignField: '_id',
      as: 'userDetails'
    }
  },
  {
    $lookup: {
      from: 'users',
      localField: 'admin',
      foreignField: '_id',
      as: 'adminDetails'
    }
  },
  {
    $lookup: {
      from: 'departaments',
      localField: 'departament',
      foreignField: '_id',
      as: 'departamentDetails'
    }
  },
  {
    $unwind: {
      path: '$userDetails',
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $unwind: {
      path: '$adminDetails',
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $unwind: {
      path: '$departamentDetails',
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $lookup: {
      from: 'users',
      localField: 'utilization.charge',
      foreignField: '_id',
      as: 'utilizationDetails'
    }
  },
  {
    $unwind: {
      path: '$utilizationDetails',
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $project: {
      _id: 1,
      category: 1,
      type: 1,
      serial: 1,
      model: 1,
      year: 1,
      exp_start: 1,
      chars: 1,
      power: 1,
      departament: '$departamentDetails',
      user: '$userDetails',
      service: 1,
      nextService: 1,
      admin: '$adminDetails',
      modification: 1,
      utilization: {
        date: '$utilization.date',
        charge: '$utilizationDetails',
        sell: '$utilization.sell'
      },
      ip: 1
    }
  }
]

export default new class HardwareService {
    async createHardware (hardwareData: Hardware | IpHardware) {
        await hardwareModel.create({
          ...hardwareData, 
          user: new mongoose.Types.ObjectId(hardwareData.user), 
          admin: new mongoose.Types.ObjectId(hardwareData.admin), 
          departament: new mongoose.Types.ObjectId(hardwareData.departament), 
          utilization: (hardwareData.utilization) ? {
            date: hardwareData.utilization.date, 
            charge: new mongoose.Types.ObjectId(hardwareData.utilization.charge)
          } : undefined
        });
    }

    async getHardwareById (id: string): Promise<HardwareResponse> {
        const result = await hardwareModel.aggregate([
            {
              $match: { _id: new mongoose.Types.ObjectId(id) }
            },
            ...lookupQuery
          ]);
          return result[0] as HardwareResponse;
    }

    async filterHardware(query: any[]): Promise<HardwareResponse[]> {
      let match = query[0].$match;
      if(match?.user) match = {...match, user: new mongoose.Types.ObjectId(match.user as string)};
      if(match?.admin) match = {...match, admin: new mongoose.Types.ObjectId(match.admin as string)};
      if(match?.departament) match = {...match, departament: new mongoose.Types.ObjectId(match.departament as string)};

      const result = await hardwareModel.aggregate([
        {$match: match},
        ...lookupQuery
      ]);

      return result;
    }

    async editHardware (id: string, handwareData: Hardware | IpHardware) {
        await hardwareModel.findByIdAndUpdate(id, handwareData);
    }

    async uploadInstruction(hardwareId: string, filePath: string) {
      await instructionModel.deleteMany({hardwareId: new mongoose.Types.ObjectId(hardwareId)});
      await instructionModel.create({filePath: filePath.replace("/src/hardware",""), hardwareId: new mongoose.Types.ObjectId(hardwareId)});
    }

    async modernize(hardwareId: string, newChars: string) {
      await hardwareModel.findByIdAndUpdate(hardwareId, {modification: null, chars: newChars});
    }   

    async deleteById(hardwareId: string) {
      await hardwareModel.findByIdAndDelete(hardwareId);

      const convertedId = new mongoose.Types.ObjectId(hardwareId);
      const modificationRequests = await modificationRequestModel.find({hardware: convertedId});
      modificationRequests.map(async (request) => {
        await modificationRequestModel.findByIdAndDelete(request._id);
      })
      const serviceRequests = await serviceRequestModel.find({hardware: convertedId});
      serviceRequests.map(async (request) => {
        await serviceRequestModel.findByIdAndDelete(request._id);
      })
    }

    async sell(hardwareId: string, comment: string) {
      const hardware = await hardwareModel.findById(hardwareId);
      await selledModel.create({ hardware, date: new Date(), comment });
      await hardwareModel.findByIdAndDelete(hardwareId);
    }

    async getSelledHardware() {
      return await selledModel.find();
    }

    async createNewType(name: string, category: string) {
      let otherNames: string[] = [];
      Object.keys(TYPE_OPTIONS).map((category: string) => {
        (TYPE_OPTIONS[category] as {value: string, label: string}[]).map((type: {value: string, label: string}) => {
          otherNames = [...otherNames, type.label];
        });
      })
      const customTypes: string[] = (await typeModel.find()).map((type) => type.type.label);
      otherNames = [...otherNames, ...customTypes];
      if(otherNames.includes(name)) throw HardwareError.TypeExists();
      await typeModel.create({type: {label: name, value: name}, category});
    }

    async getTypes(category: string) {
      return await typeModel.find({category});
    }
}