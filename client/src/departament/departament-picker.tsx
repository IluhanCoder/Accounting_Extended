import stringHelper from "../misc/string-helper";
import SelectionPlate from "../selection/selection-plate";
import departamentService from "./departament-service";
import Departament from "./departament-types";

interface LocalParams {
    onChange: (name: string, value: Departament | null) => void,
    className?: string,
    defaultValue?: Departament
}

function DepartamnetPicker({onChange, className, defaultValue}: LocalParams) {
    const getDepartaments = async (): Promise<Departament[]> => {
        return (await departamentService.fetchDepartaments()).departaments;
    }

    const departamentsDisplayField = (departament: Departament) => `${departament.name}`;

    const departamentFilterField = (departament: Departament, value: string | null) => value ? stringHelper.unstrictCompare(departament.name, value) : true;

    return <SelectionPlate<Departament> defaultValue={defaultValue} className={className ?? "flex gap-4 px-4 py-1"} closeAfterSubmit searchPanelLabel="назва відділу" filterField={departamentFilterField} label="відділення" name="departament" displayField={departamentsDisplayField} fetchData={getDepartaments} onChange={onChange}/>
}

export default DepartamnetPicker