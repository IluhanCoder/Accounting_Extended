import { ChangeEvent, useEffect, useState } from "react";
import { HardwareResponse } from "./hardware-types";
import LoadingScreen from "../misc/loading-screen";
import hardwareService from "./hardware-service";
import User, { UserResponse } from "../user/user-types";
import Departament, { DepartamentResponse } from "../departament/departament-types";
import { grayButtonStyle, lightButtonStyle, submitButtonStyle } from "../styles/button-syles";
import TYPE_OPTIONS from "./type-options";
import { useNavigate } from "react-router-dom";
import userStore from "../user/user-store";
import { observer } from "mobx-react";
import { smallInputStyle } from "../styles/form-styles";
import html2PDF from "jspdf-html2canvas";
import HardwareCard from "./hardware-card";
import SearchPanel from "./search-panel";

function SearchPage({isPersonal}: {isPersonal?: boolean}) {
    const navigate = useNavigate();

    interface localFormData {
        category: string | undefined 
        model: string | undefined,
        serial: string | undefined,
        ip: string | undefined,
        user: User | undefined,
        departament: DepartamentResponse | undefined
    }

    const [hardware, setHardware] = useState<HardwareResponse[]>();
    const [formData, setFormData] = useState<localFormData>({
        category: undefined,
        model: undefined,
        serial: undefined,
        ip: undefined,
        user: undefined,
        departament: undefined
    });

    const filter = async () => {
        let $match = {};
        if(isPersonal) {
            const currentUser = userStore.user;
            if(currentUser?.role === "user") $match = {user: currentUser._id}
            if(currentUser?.role === "admin") $match = {admin: currentUser._id}
        }
        for(const key in formData) {
            const value = formData[key as keyof localFormData];
            if(value) 
                $match = {...$match, [key]: (typeof value === "string") ? ((key === "ip") ? { $in: [value] } : { $regex: value }) : value._id}
        }
        console.log($match);
        const res = await hardwareService.filterHardware([{$match}]);
        setHardware([...res.hardware]);
    }

    const handleChange = (name: string, value: User | Departament) => {
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };

    const generatePdf = async () => {
        const page = document.getElementById("results");
        const buttons = page?.querySelectorAll("#button");
        buttons?.forEach((button) => {
            button.remove()
        })
        await html2PDF(page!, {
            jsPDF: {
              format: "a4",
            },
            imageType: "image/jpeg",
            output: "./pdf/generate.pdf",
          });
      };

    useEffect(() => {
        filter();
    }, [formData]);

    if(hardware) return hardware.length > 0 && <div className="flex h-full flex-col">
        <SearchPanel onChange={handleChange}/>
        <div className="grow overflow-auto">
            <div className="flex flex-wrap p-4 gap-6" id="results">
                {hardware.map((hard: HardwareResponse) => 
                    <HardwareCard hardwareData={hard}/>
                )}
            </div>
        </div>
        <div className="flex justify-center p-6">
            <button className={lightButtonStyle} type="button" onClick={generatePdf}>Завантажити звіт</button>
        </div>
    </div> || <div className="flex justify-center p-20">у вас відсутнє обладнання</div>
    else return <LoadingScreen/>
}

export default observer(SearchPage);