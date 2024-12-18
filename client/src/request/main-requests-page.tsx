import { useEffect, useState } from "react";
import { hardwareRequestResponse } from "./request-types";
import requestService from "./request-service";
import { lightButtonStyle, redButtonSyle, submitButtonStyle } from "../styles/button-syles";
import { useNavigate } from "react-router-dom";
import DateFormater from "../misc/date-formatter";
import { toast } from "react-toastify";
import html2PDF from "jspdf-html2canvas";
import cardStyle from "../styles/card-styles";

function MainRequestsPage() {
    const [requests, setRequests] = useState<hardwareRequestResponse[]>([]);
    const navigate = useNavigate();

    const getData = async () => {
        const result = await requestService.getHardwareRequests();
        console.log(result);
        setRequests([...result.requests]);
    }

    const handleSubmit = async (hardwareRequestResponse: hardwareRequestResponse) => {
        await requestService.submitHardwareRequest(hardwareRequestResponse._id);
        navigate(`/submit-hardware-request/${hardwareRequestResponse._id}`);
    }

    const handleDelete = async (hardwareResponse: hardwareRequestResponse) => {
        await requestService.deleteHardwareRequests(hardwareResponse._id);
        getData();
    }

    useEffect(() => {
        getData();
    }, []);

    if( requests.length > 0)return <div className="flex flex-col p-6 gap-2">
        <div className="flex p-6 flex-wrap gap-4" id="results">
            {requests.map((request: hardwareRequestResponse) => {
                return <div className={cardStyle}>
                    <div className="flex gap-1">
                        <label>запит від:</label>
                        <label>{request.admin.nickname}</label>
                    </div>
                    <div className="flex gap-1">
                        <label>тип:</label>
                        <label>{request.type}</label>
                    </div>
                    <div className="flex gap-1">
                        <label>бажана модель:</label>
                        <label>{request.model}</label>
                    </div>
                    <div className="flex gap-1">
                        <label>бажані характеристики:</label>
                        <label>{request.chars}</label>
                    </div>
                    <div className="flex gap-1">
                        <label>мета застосування:</label>
                        <label>{request.purpose}</label>
                    </div>
                    <div className="flex flex-col gap-1 border p-1 rounded">
                        <label className="text-xs">умови:</label>
                        {request.rent && <div>
                            <div>оренда</div>
                            <div className="flex gap-2">
                                <label>початок:</label>
                                <DateFormater dayOfWeek value={request.rent.startDate}/>
                            </div>
                            <div className="flex gap-2">
                                <label>кінець:</label>
                                <DateFormater dayOfWeek value={request.rent.endDate}/>
                            </div>
                        </div> || <div>купівля</div>}
                    </div>
                    <div className="flex gap-1">
                        <label>статус запиту:</label>
                        <div>{(request.status === "created") ? "створено" : "затверджено"}</div>
                    </div>
                    <div className="flex gap-2 justify-center">
                        {request.status !== "submited" && <button type="button" className={submitButtonStyle} onClick={() => handleSubmit(request)}>затвердити</button>}
                        <button type="button" className={redButtonSyle} onClick={() => handleDelete(request)}>видалити</button>
                    </div>
                </div>
            })}
        </div>
    </div>
    else return <div className="w-full flex flex-col h-full justify-center">
        <div className="flex justify-center">
            запити відсутні
        </div>
    </div>
}

export default MainRequestsPage;