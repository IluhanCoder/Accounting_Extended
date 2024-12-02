import { toast } from "react-toastify";
import requestService from "./request-service";
import { serviceRequestResponse } from "./request-types";
import { submitButtonStyle } from "../styles/button-syles";
import cardStyle from "../styles/card-styles";
import { useState } from "react";
import ServiceRequestCard from "./service-req-card";

interface LocalParams {
    requests: serviceRequestResponse[],
    callBack: () => void,
    className: string
}

function ServiceRequestMapper({ requests, callBack, className }: LocalParams) {
    const handleDeleteSerRequest = async (id: string, text: string) => {
        if(text.length === 0) {
            toast.error("ви маєте заповнити інформацію про обслуговування");
            return;
        }
        await requestService.deleteServiceRequest(id, text);
        toast.success("запит було успішно затверджено");
        callBack();
    }

    if (requests.length > 0) return <div className={className}>{requests.map((serviceRequest: serviceRequestResponse) => <ServiceRequestCard handleSubmit={handleDeleteSerRequest} serviceRequest={serviceRequest}/>)}</div>
    else return <div className="text-center p-6">запити відсутні</div>
}

export default ServiceRequestMapper;