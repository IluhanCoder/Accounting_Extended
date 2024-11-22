import formStore from "../forms/form-store";
import { lightButtonStyle } from "../styles/button-syles";

interface LocalParams<T> {
    item: T,
    onClick: (item: T) => void,
    buttonLabel: string,
    displayField: (item: T) => string,
    index?: number,
    closeAfterSubmit?: boolean
}

function ItemCard<T>({item, index, onClick, buttonLabel, displayField, closeAfterSubmit}: LocalParams<T>) {
    return <div key={index} className="bg-gray-50 rounded border py-2 px-5">
        <div className="p-2 text-center">{displayField(item)}</div>
        <div className="flex justify-center">
            <button type="button" className={lightButtonStyle} onClick={() => {onClick(item); if(closeAfterSubmit) formStore.dropForm()}}>{buttonLabel ?? "обрати"}</button>
        </div>
    </div>
}

export default ItemCard;