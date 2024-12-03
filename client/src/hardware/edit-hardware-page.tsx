import { useParams } from "react-router-dom";
import Hardware, { ConvertHardwareFormToHardware, HardwareFormData, HardwareResponse, IpHardware } from "./hardware-types";
import hardwareService from "./hardware-service";
import HardwareForm from "./hardware-form";
import { useEffect, useState } from "react";
import LoadingScreen from "../misc/loading-screen";
import userStore from "../user/user-store";
import { observer } from "mobx-react";
import { grayButtonStyle, lightButtonStyle, submitButtonStyle } from "../styles/button-syles";
import fileDownload from "js-file-download";
import { toast } from "react-toastify";

function EditHardwarePage() {
    const edit = userStore.user?.edit || userStore.user?.role === "admin" || userStore.user?.role === "main";

    const {id} = useParams<{id: string}>();
    const [defaultData, setDefaultData] = useState<HardwareResponse>();
    const [instruction, setInstruction] = useState<File | null>(null);

    const url = process.env.REACT_APP_API_URL;

    const getData = async () => {
        if(!id) return;
        const res = await hardwareService.getHardwareById(id);
        setDefaultData({...res.hardware});
    }

    useEffect(() => {
        getData();
    }, []);

    const handleUploadInstruction = () => {
        document.getElementById("file")?.click();
    }

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("file");
        if(defaultData && e.target.files) {
            toast("обробка запиту...");
            await hardwareService.uploadInstruction(defaultData?._id, e.target.files[0]);
            toast.success("інструкцію було успіщно завантажено");
            console.log()
        }
    }

    const handleSubmit = async (hardwareData: HardwareFormData) => {
        if(!id) return;
        const convertedData = ConvertHardwareFormToHardware(hardwareData);
        toast("обробка запиту...");
        await hardwareService.updateHardware(id, convertedData);
        toast.success("інформацію про обладнання було успішно оновлено");
        getData();
    }

    const handleDownloadInstruction = async () => {
        if(defaultData) {
            const res = await hardwareService.downloadInstruction(defaultData?._id);
            if(!res) return;
            if(res.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") fileDownload(res, "instruction.docx");
            else if(res.type === "image/png") fileDownload(res, "instruction.png");
            else if(res.type === "image/jpeg") fileDownload(res, "instruction.jpeg");
            else if(res.type === "application/pdf") fileDownload(res, "instruction.pdf");
            else fileDownload(res, "instruction");
        }
    }

    if(defaultData) return <div>
        <HardwareForm showDeleteButton showRequestButtons showRecomendations buttonLabel={"внести зміни"} onSubmit={handleSubmit} defaultData={defaultData}/>
        {edit && <div className="flex justify-center">
            <div className="flex flex-col mt-4">
                    <div>
                        <input id="file" className="hidden" onChange={handleFile} type="file" name="instruction" />
                        <button id="button" className={lightButtonStyle} onClick={handleUploadInstruction}>
                            додати інструкцію
                        </button>
                    </div>
                </div>
            </div>}
        <div className="flex justify-center mt-2">
            <button className={grayButtonStyle} type="button" onClick={handleDownloadInstruction}>завантажити інструкцію</button>
        </div>
    </div>
    else return <LoadingScreen/>
}

export default observer(EditHardwarePage);