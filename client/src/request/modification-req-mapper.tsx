import { toast } from "react-toastify";
import { submitButtonStyle } from "../styles/button-syles";
import requestService from "./request-service";
import { modificationRequestResponse } from "./request-types";
import cardStyle from "../styles/card-styles";
import ModificationRequestCard from "./modification-req-card";

interface LocalParams {
    requests: modificationRequestResponse[],
    callBack: () => void,
    className: string
}

function ModificationRequestsMapper({requests, callBack, className}: LocalParams) {
    const handleDeleteModRequest = async (id: string, text: string) => {
        await requestService.deleteModificationRequest(id, text);
        toast.success("запит було успішно затверджено");
        callBack();
    } 

    if (requests.length > 0) return <div className={className}>{requests.map((modificationRequest: modificationRequestResponse) => <ModificationRequestCard modificationRequest={modificationRequest} handleSubmit={handleDeleteModRequest}/>)} </div>
    else return <div className="text-center p-6">запити відсутні</div>
}

export default ModificationRequestsMapper;