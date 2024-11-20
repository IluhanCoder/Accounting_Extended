import stringHelper from "../misc/string-helper";
import SelectionModal from "../selection/selection-modal";
import departamentService from "./departament-service";
import Departament from "./departament-types";

interface LocalParams {
    onChange: (name: string, value: Departament | null) => void
}

function DepartamnetPicker({onChange}: LocalParams) {
    const getDepartaments = async (): Promise<Departament[]> => {
        return (await departamentService.fetchDepartaments()).departaments;
    }

    const departamentsDisplayField = (departament: Departament) => `${departament.name}`;

    const departamentFilterField = (departament: Departament, value: string) => stringHelper.unstrictCompare(departament.name, value);

    return <SelectionModal<Departament> filterField={departamentFilterField} label="відділення" name="departament" displayField={departamentsDisplayField} fetchData={getDepartaments} onChange={onChange}/>
}

export default DepartamnetPicker