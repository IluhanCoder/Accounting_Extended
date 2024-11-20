import { ChangeEvent, useState } from "react";
import { lightButtonStyle } from "../styles/button-syles";
import formStore from "../forms/form-store";
import { inputStyle } from "../styles/form-styles";
import SearchInput from "../misc/search-input";

interface LocalParams<T> {
    data: T[],
    filterField: (item: T, value: string) => boolean,
    displayField: (item: T) => string,
    closeAfterSubmit?: boolean,
    onChange: (item: T) => void,
    buttonLabel?: string,
    searchPanelLabel?: string
}

function SelectionMapper<T>({data, filterField, displayField, closeAfterSubmit, onChange, buttonLabel, searchPanelLabel}: LocalParams<T>) {
    const [filterInput, setFilterInput] = useState<string | null>(null);

    const filteredItems = filterInput ? data.filter((entry: T) => filterField(entry, filterInput)) : data

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newValue: string = event.target.value;
        setFilterInput(newValue.length > 0 ? newValue : null);
    };

    return <div className="flex flex-col gap-4 p-4">
            <div>
                <SearchInput placeholder={searchPanelLabel} onChange={handleInputChange}/>
            </div>
            <div className="flex gap-2 overflow-auto">
                {filteredItems.map((entry: T, index: number) => 
                    <div key={index} className="bg-gray-50 rounded border py-2 px-5">
                        <div className="p-2 text-center">{displayField(entry)}</div>
                        <div className="flex justify-center">
                            <button type="button" className={lightButtonStyle} onClick={() => {onChange(entry); if(closeAfterSubmit) formStore.dropForm()}}>{buttonLabel ?? "обрати"}</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
}

export default SelectionMapper;