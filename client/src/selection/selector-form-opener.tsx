import { useEffect, useState } from "react";
import User from "../user/user-types";
import userService from "../user/user-service";
import { lightButtonStyle, submitButtonStyle } from "../styles/button-syles";
import Departament from "../departament/departament-types";
import { IoIosSearch } from "react-icons/io";
import { smallInputStyle } from "../styles/form-styles";
import SelectionMapper from "./selection-mapper";
import FormComponent from "../forms/form-component";
import formStore from "../forms/form-store";
import { observer } from "mobx-react";

interface LocalParams<T> {
    onChange: (entry: T | null) => void,
    data: T[],
    buttonLabel?: string,
    closeAfterSubmit?: boolean,
    filterField: (item: T, value: string) => boolean,
    displayField: (item: T) => string,
    searchPanelLabel?: string,
    label?: string
}

function SelectFormOpener<T>({onChange, displayField, label, data, searchPanelLabel, buttonLabel, closeAfterSubmit, filterField}: LocalParams<T>) {
    if(!buttonLabel) buttonLabel = "додати";

    const handleOpenForm = () => {
        const form = <FormComponent className="w-2/3" formLabel={label ?? ""}>
                <SelectionMapper<T> searchPanelLabel={searchPanelLabel} closeAfterSubmit={closeAfterSubmit} displayField={displayField} onChange={onChange} data={data} filterField={filterField}/>
            </FormComponent>;
        formStore.setForm(form);
    }

    return <div className="flex w-full ">
            <div className="flex gap-6 rounded w-full justify-center">
                <button type="button" className={lightButtonStyle} onClick={handleOpenForm}>обрати</button>
            </div>
        </div>
}

export default observer(SelectFormOpener);