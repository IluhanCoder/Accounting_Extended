import Option from "./option-type";

interface LocalParams {
    options: Option[]
}

function OptionsMapper ({options}: LocalParams) {
    return (
        <>
            {options.map((category: { value: string; label: string }) => (
                <option key={category.value} value={category.value}>
                    {category.label}
                </option>
            ))}
        </>
    );
}

export default OptionsMapper;