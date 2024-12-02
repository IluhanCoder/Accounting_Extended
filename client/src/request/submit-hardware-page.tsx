import { useEffect, useState } from "react";
import HardwareForm from "../hardware/hardware-form";
import { hardwareRequestResponse } from "./request-types";
import requestService from "./request-service";
import Hardware, { ConvertHardwareFormToHardware, HardwareFormData, HardwareResponse } from "../hardware/hardware-types";
import TYPE_OPTIONS from "../hardware/type-options";
import moment from "moment";
import hardwareService from "../hardware/hardware-service";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "../misc/loading-screen";
import { toast } from "react-toastify";

function SubmitHardwarePage () {
    const navigate = useNavigate();

    const {hardwareRequestId} = useParams();

    const [request, setRequest] = useState<hardwareRequestResponse>();
    const [defaultData, setDefaultData] = useState<HardwareFormData>();

    const getData = async () => {
        if(hardwareRequestId) {
            const result = await requestService.getHardwareRequestById(hardwareRequestId);
            setRequest({...result.request});
        }
    };

    useEffect(() => {
        getData();
    }, [hardwareRequestId]);

    useEffect(() => {
        getDefaultData();
    }, [request]);

    const getDefaultData = () => {
        if(request)
            setDefaultData({
                _id: "",
                category: request.category,
                type: TYPE_OPTIONS["comp"][0],
                serial: "",
                model: (request?.model) ? request?.model : "",
                year: 2024,
                exp_start: new Date(),
                chars: (request?.chars) ? request?.chars : "",
                departament: undefined,
                user: request?.user ?? undefined,
                service: [],
                nextService: new Date(),
                admin: request?.admin,
                modification: undefined,
                utilization: {
                    charge: undefined,
                    date: moment().format('YYYY-MM-DD'),
                    sell: false
                },
                ip: []
            })
    }
    
    const onSubmit = async (data: HardwareFormData) => {
        if(!request) return;
        const convertedData: Hardware = ConvertHardwareFormToHardware(data);
        toast("обробка запиту...");
        await hardwareService.createHardware(convertedData);
        await requestService.submitHardwareRequest(request?._id);
        navigate("/search");
    }

    if(defaultData && request) return <HardwareForm onSubmit={onSubmit} buttonLabel="створити" defaultData={defaultData}/>
    else return <LoadingScreen/>
}

export default SubmitHardwarePage;