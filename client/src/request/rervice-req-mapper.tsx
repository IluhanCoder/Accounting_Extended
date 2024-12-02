import { toast } from "react-toastify";
import requestService from "./request-service";
import { serviceRequestResponse } from "./request-types";
import { submitButtonStyle } from "../styles/button-syles";
import cardStyle from "../styles/card-styles";

interface LocalParams {
    requests: serviceRequestResponse[],
    callBack: () => void,
    className: string
}

function ServiceRequestMapper({ requests, callBack, className }: LocalParams) {
    const handleDeleteSerRequest = async (id: string) => {
        await requestService.deleteServiceRequest(id);
        toast.success("запит було успішно затверджено");
        callBack();
    }

    if (requests.length > 0) return <div className={className}>{requests.map((serviceRequest: serviceRequestResponse) => <div className={cardStyle}>
        <div className="flex gap-1">
            <label>Запит від:</label>
            <label>{serviceRequest.requester.nickname}</label>
        </div>
        <div className="flex gap-1">
            <label>Тип:</label>
            <label>{serviceRequest.type}</label>
        </div>
        <div className="flex flex-col">
            <label>Опис проблеми:</label>
            <label>{serviceRequest.type}</label>
        </div>
        <div className="flex flex-col">
            <label>Критичність:</label>
            <label>{serviceRequest.crit}</label>
        </div>
        <div className="flex justify-center mt-2">
            <button className={submitButtonStyle} type="button" onClick={() => handleDeleteSerRequest(serviceRequest._id)}>затвердити</button>
        </div>
    </div>)}</div>
    else return <div className="text-center p-6">запити відсутні</div>
}

export default ServiceRequestMapper;