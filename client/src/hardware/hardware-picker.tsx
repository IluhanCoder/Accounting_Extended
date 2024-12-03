import { onChange } from "react-toastify/dist/core/store";
import stringHelper from "../misc/string-helper";
import SelectionPlate from "../selection/selection-plate";
import hardwareService from "./hardware-service";
import { HardwareResponse } from "./hardware-types";

interface LocalParams {
    className?: string,
    onChange: (name: string, value: HardwareResponse | null) => void,
    closeAfterSubmit?: boolean,
    defaultValue?: HardwareResponse,
    label?: string
}

export default function HardwarePicker({className, defaultValue, label, closeAfterSubmit, onChange}: LocalParams) {
    const hardwareFilterField = (hardware: HardwareResponse, value: string | null) => {
        const namesMatches = value ? stringHelper.unstrictCompare(hardware.model, value) : true;
        return namesMatches;
    }

    const fetchHardware = async () => {
        return (await hardwareService.filterHardware([{$match: {}}])).hardware;
    }

    const hardwareDisplayField = (hardware: HardwareResponse) => `${hardware.model} (сер.номер:${hardware.serial})`

    return <SelectionPlate<HardwareResponse> label={label} defaultValue={defaultValue} onChange={onChange} fetchData={fetchHardware} name="hardware" displayField={hardwareDisplayField} filterField={hardwareFilterField} className={className ?? "flex gap-4 px-4 py-1"} searchPanelLabel="модель обладнання" />
}