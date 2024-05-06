import { ChangeEvent, useState } from "react";
import { Service } from "./hardware-types"
import { submitButtonStyle } from "../styles/button-syles";
import { smallInputStyle } from "../styles/form-styles";
import ReactDatePicker from "react-datepicker";
import moment from "moment";

interface LocalParams {
    pushHandler: (service: Service) => void
}

function ServicePusher({pushHandler}: LocalParams) {
    const [formData, setFormData] = useState<Service>({
        date: new Date(),
        service: ""
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
    };    

    return <div className="bg-gray-50 p-2 flex justify-center">
        <div className="flex gap-4">
            <input className={smallInputStyle + " w-72"} type="text" name="service" onChange={handleChange}/>
            <ReactDatePicker value={moment(formData.date).format('YYYY-MM-DD')}  className={smallInputStyle + " mt-0.5"} locale="ua" onChange={(date: Date | null) => {if(date) setFormData({...formData, date})}} />
            <button type="button" className={submitButtonStyle} onClick={() => pushHandler(formData)}>додати</button>
        </div>
    </div>
}

export default ServicePusher;