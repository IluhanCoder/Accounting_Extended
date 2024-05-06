import { useEffect, useState } from "react";
import Picker from "../misc/picker";
import LoadingScreen from "../misc/loading-screen";
import departamentService from "./departament-service";
import Departament, { DepartamentResponse } from "./departament-types";

interface LocalParams {
    handlePush: (departament: DepartamentResponse) => void; 
}

function DepartamentPicker ({handlePush}: LocalParams) {
    const [departaments, setDepartaments] = useState<DepartamentResponse[]>();

    const getData = async () => {
        const res = await departamentService.fetchDepartaments();
        setDepartaments([...res.departaments]);
    }

    useEffect(() => { getData() }, []);

    if(departaments) return <Picker<DepartamentResponse> label="відділ" closeAfterSubmit data={departaments} handlePush={handlePush} buttonLabel={"обрати"}/>
    else return <LoadingScreen/>
}

export default DepartamentPicker;