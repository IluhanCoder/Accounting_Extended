import { toast } from "react-toastify";
import { submitButtonStyle } from "../styles/button-syles";
import requestService from "./request-service";
import { modificationRequestResponse } from "./request-types";
import cardStyle from "../styles/card-styles";

interface LocalParams {
    requests: modificationRequestResponse[],
    callBack: () => void,
    className: string
}

function ModificationRequestsMapper({requests, callBack, className}: LocalParams) {
    const handleDeleteModRequest = async (id: string) => {
        await requestService.deleteModificationRequest(id);
        toast.success("запит було успішно затверджено");
        callBack();
    } 

    if (requests.length > 0) return <div className={className}>{requests.map((modificationRequest: modificationRequestResponse) => <div className={cardStyle}>
        <div className="flex gap-1">
            <label>Запит від:</label>
            <label>{modificationRequest.requester.nickname}</label>
        </div>
        <div className="flex gap-1">
            <label>Тип:</label>
            <label>{modificationRequest.type}</label>
        </div>
        <div className="flex gap-1">
            <label>Причина:</label>
            <label>{modificationRequest.reason}</label>
        </div>
        <div>
            <label>Бажані характеристики:</label>
            <label>{modificationRequest.chars}</label>
        </div>
        <div>
            <label>Критичність:</label>
            <label>{modificationRequest.crit}</label>
        </div>
        <div className="flex justify-center mt-2">
            <button className={submitButtonStyle} type="button" onClick={() => handleDeleteModRequest(modificationRequest._id)}>затвердити</button>
        </div>
    </div>)} </div>
    else return <div className="text-center p-6">запити відсутні</div>
}

export default ModificationRequestsMapper;