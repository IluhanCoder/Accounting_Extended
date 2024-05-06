import { ChangeEvent, useState } from "react";
import { submitButtonStyle } from "../styles/button-syles";
import { inputStyle, smallInputStyle } from "../styles/form-styles";

interface LocalParams {
    handlePush: (ip: string) => void
}

function IpPusher({handlePush}: LocalParams) {
    const [ip, setIp] = useState<string>();

    const hadleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIp(event.target.value);
    }

    const handleClick = () => {
        if(!ip) return;
        handlePush(ip);
        setIp(undefined);
    }

    return <div>
        <div className="flex gap-2">
            <input className={inputStyle} type="text" value={ip ?? ""} onChange={hadleChange}/>
            <button type="button" onClick={handleClick} className={submitButtonStyle}>додати</button>
        </div>
    </div>
}

export default IpPusher;