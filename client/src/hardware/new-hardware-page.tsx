import { observer } from "mobx-react";
import HardwareForm from "./hardware-form";
import hardwareService from "./hardware-service";
import Hardware, { ConvertHardwareFormToHardware, HardwareFormData } from "./hardware-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function NewHardwarePage() {
    const navigate = useNavigate();

    const handleSubmit = async (formData: HardwareFormData) => {
        const convertedData: Hardware = ConvertHardwareFormToHardware(formData);
        toast("обробка запиту...");
        await hardwareService.createHardware(convertedData);
        navigate("/search");
        toast.success("обладнання було успішно додано");
    }

    return <HardwareForm buttonLabel={"додати"} onSubmit={handleSubmit}/>
}

export default observer(NewHardwarePage);