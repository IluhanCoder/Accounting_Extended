import cardStyle from "../styles/card-styles";
import { PowerResponse } from "./analytics-types";

interface LocalParams {
    data: PowerResponse
}

export default function PowerCard({data}: LocalParams) {
    return <div className={cardStyle}>
        <div>
            <label>відділ:</label>
            <div>{data.departament.name}</div>
        </div>
        <div>
            <label>споживання:</label>
            <div>{`${data.power} кВт*год`}</div>
        </div>
    </div>
}