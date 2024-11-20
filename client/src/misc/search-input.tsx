import { IoIosSearch } from "react-icons/io";
import { inputStyle } from "../styles/form-styles";
import { ChangeEvent } from "react";

interface LocalParams {
    name?: string,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
    placeholder?: string,
    className?: string
}

function SearchInput({name, onChange, placeholder, className}: LocalParams) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(onChange) onChange(event);
    }

    return <div className={inputStyle + " flex gap-2 shadow shadow-lg shadow-blue-200 " + className}>
        <IoIosSearch className="mt-1 text-gray-400" />
        <input name={name} placeholder={placeholder} className="appearance-none grow border-none p-0 bg-transparent outline-none" onChange={handleChange} />
    </div>
}

export default SearchInput;