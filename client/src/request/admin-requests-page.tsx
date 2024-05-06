import { useEffect, useState } from "react";
import { modificationRequestResponse, serviceRequestResponse } from "./request-types";
import requestService from "./request-service";
import { submitButtonStyle } from "../styles/button-syles";
import { smallInputStyle } from "../styles/form-styles";
import { toast } from "react-toastify";

function AdminRequestPage() {
    const [serviceRequests, setServiceRequests] = useState<serviceRequestResponse[]>([]);
    const [modRequests, setModRequests] = useState<modificationRequestResponse[]>([]);

    const [requestSwitch, setRequestSwitch] = useState<string>("service");

    const getData = async () => {
        const services = (await requestService.getAdminSerRequests()).requests;
        const modifications = (await requestService.getAdminModRequests()).requests;
        console.log(services);
        setServiceRequests([...services]);
        setModRequests([...modifications]);
    }

    const handleDeleteModRequest = async (id: string) => {
        await requestService.deleteModificationRequest(id);
        toast.success("запит було успішно затверджено");
        getData();
    } 

    const handleDeleteSerRequest = async (id: string) => {
        await requestService.deleteServiceRequest(id);
        toast.success("запит було успішно затверджено");
        getData();
    } 

    useEffect(() => {
        getData();
    }, [requestSwitch]);

    return <div>
        <div>
            <div className="bg-gray-50 p-2 flex justify-center">
                <select className={smallInputStyle} value={requestSwitch} onChange={(e) => {setRequestSwitch(e.target.value)}}>
                    <option value="service">запити на обслуговування</option>
                    <option value="modification">запити на модернізацію</option>
                </select>
            </div>
            <div className="p-4">
                {(requestSwitch === "modification") ? <div className="flex flex-wrap gap-2">
                    {modRequests.length>0 && modRequests.map((modificationRequest: modificationRequestResponse) => <div className="border rounded p-2">
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
                    </div>) || <div className="text-center p-6">запити відсутні</div>}
                </div> : 
                <div className="flex flex-wrap gap-2">
                    {serviceRequests.length>0 && serviceRequests.map((serviceRequest: serviceRequestResponse) => <div  className="flex flex-col gap-1 border rounded p-6">
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
                    </div>) || <div className="text-center p-6">запити відсутні</div>}
            </div>}
            </div>
        </div>
    </div>
}

export default AdminRequestPage;