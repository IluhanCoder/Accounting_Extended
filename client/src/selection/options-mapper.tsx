import Option from "./option-type";

interface LocalParams {
    options: Option[]
}

function OptionsMapper ({options}: LocalParams) {
    return (
        <>
            {options.map((category: { value: string; label: string }, index: number) => (
                <option key={index} value={category.value}>
                    {category.label}
                </option>
            ))}
        </>
    );
}

export default OptionsMapper;