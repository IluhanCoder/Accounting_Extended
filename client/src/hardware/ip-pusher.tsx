import { ChangeEvent, useState } from "react";
import { submitButtonStyle } from "../styles/button-syles";
import { inputStyle, smallInputStyle } from "../styles/form-styles";

interface LocalParams {
    handlePush: (ip: string) => void,
    className?: string
}

function IpPusher({handlePush, className}: LocalParams) {
    const [ip, setIp] = useState<string>();

    const hadleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIp(event.target.value);
    }

    const handleClick = () => {
        if(!ip) return;
        handlePush(ip);
        setIp(undefined);
    }

    return <div className={className}>
        <input placeholder="ip-адреса" className={inputStyle + " grow"} type="text" value={ip ?? ""} onChange={hadleChange}/>
        <button type="button" onClick={handleClick} className={submitButtonStyle}>додати ip</button>
    </div>
}

export default IpPusher;