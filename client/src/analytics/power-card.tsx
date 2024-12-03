import cardStyle from "../styles/card-styles";
import { PowerResponse } from "./analytics-types";

interface LocalParams {
    data: PowerResponse
}

export default function PowerCard({data}: LocalParams) {
    return <div className={cardStyle}>
        <div>
            <label className="text-xs text-gray-600 font-bold">відділ:</label>
            <div>{data.departament.name}</div>
        </div>
        <div>
            <label className="text-xs text-gray-600 font-bold">споживання:</label>
            <div>{`${data.power} кВт*год`}</div>
        </div>
    </div>
}