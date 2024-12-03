import { ChangeEvent, useEffect, useState } from "react";
import OptionsMapper from "../selection/options-mapper";
import { selectStyle } from "../styles/form-styles";
import { Categories } from "./hardware-types";
import TYPE_OPTIONS from "./type-options";
import { onChange } from "react-toastify/dist/core/store";
import { grayButtonStyle } from "../styles/button-syles";
import formStore from "../forms/form-store";
import NewTypeForm from "./new-type-form";
import hardwareService from "./hardware-service";

interface LocalParams {
    className?: string,
    edit?: boolean,
    defaultCategory: string,
    defaultType: string,
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
    onCategoryChange: (newTypeValue: string) => void
}

export default function CategoryAndTypeSelector({className, handleChange, onCategoryChange, edit, defaultCategory, defaultType}: LocalParams) {
    const [typeOptions, setTypeOptions] = useState<{value: string, label: string}[]>([]);

    // Function to fetch custom types
    const getCustomTypes = async (category: string) => {
        return (await hardwareService.getTypes(category)).types.map((type) => type.type);
    }

    // Function to update both default and custom types
    const updateCustomTypes = async (category: string) => {
        const customTypes = await getCustomTypes(category);
        const newOptions = TYPE_OPTIONS[category as keyof object] || [];
        setTypeOptions([...newOptions, ...customTypes]);
    }

    // Handles category change in the select input
    const handleCategoryChange = async (event: ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        onCategoryChange(newValue); // Trigger parent function on category change
        handleChange(event);        // Handle change in form

        // Update the options based on new category
        updateCustomTypes(newValue);
    }

    // This effect runs only once when the component is mounted
    useEffect(() => {
        if (defaultCategory) {
            updateCustomTypes(defaultCategory);
        }
    }, []); // Empty dependency array ensures it runs only on mount

    // Handler for adding new type
    const handleNewType = async () => {
        const getCurrentCategory = () => {
            const select = document.querySelector("select");
            const value = select?.value;
            return value;
        }
        const currentCategory = getCurrentCategory();
        if (currentCategory) formStore.setForm(<NewTypeForm onSubmit={() => { updateCustomTypes(currentCategory) }} category={currentCategory} />);
    }

    return <div className="flex flex-col gap-2">
        <div className="flex gap-4 justify-center">
                        <select id="select" className={selectStyle + " w-full"} disabled={!edit}  name="category" defaultValue={defaultCategory} onChange={handleCategoryChange}>
                            <OptionsMapper options={Categories}/>
                        </select>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <select className={selectStyle + " w-full"} disabled={!edit} value={defaultType} name="type" onChange={handleChange}>
                            <OptionsMapper options={typeOptions}/>
                        </select>
                    </div>
                    {edit && <div className="flex justify-center">
                        <button onClick={handleNewType} type="button" className={grayButtonStyle + " text-xs"}>
                            додати новий тип
                        </button>
                    </div>}
    </div>
}