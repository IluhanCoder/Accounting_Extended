import { ChangeEvent, useState } from "react";
import { lightButtonStyle } from "../styles/button-syles";
import formStore from "../forms/form-store";
import { inputStyle } from "../styles/form-styles";
import SearchInput from "../misc/search-input";
import ItemCard from "./item-card";

interface LocalParams<T> {
    data: T[],
    filterField: (item: T, value: string | null) => boolean,
    displayField: (item: T) => string,
    closeAfterSubmit?: boolean,
    onChange: (item: T) => void,
    buttonLabel?: string,
    searchPanelLabel?: string
}

function SelectionMapper<T>({data, filterField, displayField, closeAfterSubmit, onChange, buttonLabel, searchPanelLabel}: LocalParams<T>) {
    const [filterInput, setFilterInput] = useState<string | null>(null);

    const filteredItems = data.filter((entry: T) => filterField(entry, filterInput))

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newValue: string = event.target.value;
        setFilterInput(newValue.length > 0 ? newValue : null);
    };

    return <div className="flex flex-col gap-10 p-4">
            <div>
                <SearchInput placeholder={searchPanelLabel} onChange={handleInputChange}/>
            </div>
            <div className="w-full h-64 overflow-auto">
                <div className="flex flex-wrap gap-2 ">
                    {filteredItems.map((entry: T, index: number) => 
                        <ItemCard item={entry} onClick={onChange} buttonLabel="обрати" displayField={displayField} index={index} closeAfterSubmit/>
                    )}
                </div>
            </div>
        </div>
}

export default SelectionMapper;