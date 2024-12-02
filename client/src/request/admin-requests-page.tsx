import { useEffect, useState } from "react";
import { modificationRequestResponse, serviceRequestResponse } from "./request-types";
import requestService from "./request-service";
import { submitButtonStyle } from "../styles/button-syles";
import { inputStyle, smallInputStyle } from "../styles/form-styles";
import { toast } from "react-toastify";
import ModificationRequestsMapper from "./modification-req-mapper";
import ServiceRequestMapper from "./rervice-req-mapper";

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

    useEffect(() => {
        getData();
    }, [requestSwitch]);

    return <div>
        <div className="p-2 flex justify-center">
            <select className={inputStyle} value={requestSwitch} onChange={(e) => { setRequestSwitch(e.target.value) }}>
                <option value="service">запити на обслуговування</option>
                <option value="modification">запити на модернізацію</option>
            </select>
        </div>
        <div className="p-4">
            {(requestSwitch === "modification") ?
                <ModificationRequestsMapper className="flex flex-wrap gap-2" requests={modRequests} callBack={getData} /> :
                <ServiceRequestMapper className="flex flex-wrap gap-2" requests={serviceRequests} callBack={getData} />
            }
        </div>
    </div>
}

export default AdminRequestPage;