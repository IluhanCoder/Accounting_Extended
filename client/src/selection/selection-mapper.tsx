import { ChangeEvent, useState } from "react";
import { lightButtonStyle } from "../styles/button-syles";

interface LocalParams<T> {
    data: T[],
    filterField: (item: T, value: string) => boolean,
    displayField: (item: T) => string,
    closeAfterSubmit?: boolean,
    onChange: (item: T) => void,
    onClose: () => void,
    buttonLabel?: string
}

function SelectionMapper<T>({data, filterField, displayField, closeAfterSubmit, onChange, onClose, buttonLabel}: LocalParams<T>) {
    const [filterInput, setFilterInput] = useState<string | null>(null);

    const filteredItems = filterInput ? data.filter((entry: T) => filterField(entry, filterInput)) : data

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newValue: string = event.target.value;
        setFilterInput(newValue.length > 0 ? newValue : null);
    };

    return <div>
            <div>
                <input type="text" value={filterInput ?? ""} onChange={handleInputChange}/>
            </div>
            <div className="flex gap-2 overflow-auto">
                {filteredItems.map((entry: T, index: number) => 
                    <div key={index} className="bg-gray-50 rounded border py-2 px-5">
                        <div className="p-2 text-center">{displayField(entry)}</div>
                        <div className="flex justify-center">
                            <button type="button" className={lightButtonStyle} onClick={() => {onChange(entry); onClose()}}>{buttonLabel ?? "обрати"}</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
}

export default SelectionMapper;