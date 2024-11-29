import { Link } from "react-router-dom";
import { grayButtonStyle, redButtonSyle, submitButtonStyle } from "../styles/button-syles";
import { inputStyle, linkStyle, selectStyle, smallInputStyle, smallSelectStyle, staticFormContainerStyle, staticFormStyle } from "../styles/form-styles";
import { LoginCredentials } from "../auth/registration-types";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import hardwareService from "./hardware-service";
import Hardware, { Categories, ConvertHardwareFormToHardware, ConvertHardwareResToHardwareForm, HardwareFormData, HardwareResponse, IpHardware, Service } from "./hardware-types";
import Departament, { DepartamentResponse } from "../departament/departament-types";
import User, { UserResponse } from "../user/user-types";
import { HardwareFormError } from "./hardware-error";
import ServicePusher from "./service-pusher";
import moment from "moment";
import TYPE_OPTIONS from "./type-options";
import IpPusher from "./ip-pusher";
import userStore from "../user/user-store";
import { observer } from "mobx-react";
import ReactDatePicker from "react-datepicker";
import DateFormater from "../misc/date-formatter";
import OptionsMapper from "../selection/options-mapper";

interface LocalParams {
    onSubmit: (formData: HardwareFormData) => Promise<void>,
    defaultData?: HardwareResponse | HardwareFormData,
    buttonLabel: string,
    showRecomendations?: boolean 
}

function HardwareForm({onSubmit, defaultData, buttonLabel, showRecomendations}: LocalParams) {
    const edit = userStore.user?.edit && defaultData?.user?._id === userStore.user._id || userStore.user?.role === "admin" || userStore.user?.role === "main";
    const deepEdit = userStore.user?._id === defaultData?.admin?._id;

    const hasIdProperty = (hardware: any) => {
        return (hardware) ? ((hardware?._id) ? true : false) : false;
    }

    const convertedDefaultData: HardwareFormData | undefined = (hasIdProperty(defaultData)) ? ConvertHardwareResToHardwareForm(defaultData as HardwareResponse) : defaultData as HardwareFormData;
    const [formData, setFormData] = useState<HardwareFormData>(convertedDefaultData ?? {
        category: "comp",
        type: TYPE_OPTIONS["comp"][0],
        serial: "",
        model: "",
        year: 2024,
        exp_start: new Date(),
        chars: "",
        departament: undefined,
        user: undefined,
        service: [],
        nextService: new Date(),
        admin: undefined,
        modernization: undefined,
        utilization: {
            charge: undefined,
            date: moment().format('YYYY-MM-DD'),
            sell: false
        },
        ip: []
    });
    const [typeOptions, setTypeOptions] = useState<{value: string, label: string}[]>(formData.category ? TYPE_OPTIONS[formData.category as keyof object] : []);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
    };    

    const handleSubmit = async (event: FormEvent) => {
        try {
            event.preventDefault();
            await onSubmit(formData);
        } catch (error: any | HardwareFormError) {
            if(error instanceof HardwareFormError) toast.error(error.message);
        }
    }

    const handleDepartamentSelect = (name: string, departament: DepartamentResponse | null) => {
        handleDepartamentDeselect();
        if(departament) setFormData({...formData, departament: departament});
    }

    const handleDepartamentDeselect = () => {
        setFormData({...formData, departament: undefined});
    }

    const handleUserPick = (name: string, user: User | null) => {
        if(user) setFormData({...formData, user: user});
    }

    const handleAdminPick = (name: string, user: User | null) => {
        if(user) setFormData({...formData, admin: user});
    }

    const handleServicePush = (service: Service) => {
        setFormData({...formData, service: [...formData.service, service]});
    }

    const handleServicePull = (index: number) => {
        const newServices = formData.service.filter((serviceItem: Service, indexOfItem: number) => indexOfItem !== index);
        setFormData({...formData, service: [...newServices]});
    }

    const handleUtilizationChargeSelect = (name: string, user: User | null) => {
        if(user && formData.utilization?.date)
            setFormData({...formData, utilization: {...formData.utilization, charge: user, sell: formData.utilization.sell ?? false}})
        else toast.error("ви маєте обрати дату списання");
    }

    const handleUtilizationDateChange = (date: Date) => {
        let tempData = formData;
        const newDate = moment(new Date(date)).format('YYYY-MM-DD');
        if(formData.utilization?.charge) {
            tempData.utilization = {
                date: newDate,
                charge: formData.utilization?.charge,
                sell: formData.utilization.sell
            };
            setFormData({...tempData});
        }
        else toast.error("ви маєте обрати відповідального за списання");
    }
    
    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        const newOptions = TYPE_OPTIONS[newValue as keyof object];
        setTypeOptions([...newOptions]);
        setFormData({...formData, category: newValue, type: newOptions[0]});
    }

    const handleIpPush = (newIp: string) => {
        if(formData.ip.includes(newIp)) { 
            toast.error("такий ip вже додано");
            return;
        }
        const newFormData = {
            ...formData,
            ip: [...formData.ip, newIp]
        }
        setFormData({...newFormData});
    }

    const handleIpPull = (ip: string) => {
        const tempIps = formData.ip;
        tempIps.splice(tempIps.indexOf(ip), 1);
        setFormData({
            ...formData,
            ip: [...tempIps]
        })
    }

    const handleModernisationChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if(value.length === 0) setFormData({...formData, modernization: undefined});
        else setFormData({...formData, modernization: value});
    }

    const handleSellChange = () => {
        if(!formData.utilization?.charge) {
            toast.error("ви маєте обрати відповідального за списання");
            return;
        }
        setFormData({...formData, utilization: {...formData.utilization, sell: !formData.utilization.sell}});
    }
    
    return <div className={staticFormContainerStyle}>
        <form className={staticFormStyle} onSubmit={handleSubmit}>
                <div className="flex justify-center">
                    <h1 className="text-2xl">додавання обладнання</h1>  
                </div>
                    <div className="flex gap-4 justify-center">
                        <select className={selectStyle + " w-full"} disabled={!edit}  name="category" defaultValue={formData.category} onChange={handleCategoryChange}>
                            <OptionsMapper options={Categories}/>
                        </select>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <select className={selectStyle + " w-full"} disabled={!edit}  defaultValue={formData.type?.value} name="type" onChange={handleChange}>
                            <OptionsMapper options={typeOptions}/>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <input placeholder="серійний номер" disabled={!edit} defaultValue={formData.serial} className={inputStyle} type="text" onChange={handleChange} name="serial"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <input placeholder="модель" disabled={!edit} defaultValue={formData.model} className={inputStyle} type="text" onChange={handleChange} name="model"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <input placeholder="рік виготовлення" disabled={!edit}  type="number" defaultValue={formData.year} className={inputStyle} onChange={handleChange} name="year"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-bold text-gray-600 text-xs">дата початку експлуатації</label>
                        <ReactDatePicker onChange={(date: Date | null) => {if(date) setFormData({...formData, exp_start: date})}} value={moment(formData.exp_start).format('YYYY-MM-DD')} locale="ua" className={inputStyle + " w-full"}/>
                    </div>
                <div className="flex flex-col gap-2">
                    <textarea placeholder="характеристики" disabled={!edit}  defaultValue={formData.chars} className={inputStyle} onChange={handleChange} name="chars"/>
                </div>
                {
                    (formData.category === "net" || "per") && 
                    <div className="flex flex-col gap-2 py-4">
                        {edit && <IpPusher className="flex gap-4 w-full" handlePush={handleIpPush}/>}
                        <div className="overflow-auto">
                            <div className="flex flex-col gap-1 ">
                                {formData.ip.map((ip: string) => {
                                    return <div className="flex justify-between border py-1 px-10 rounded">
                                        <div className="text-center p-2">{ip}</div>
                                        <div className="flex justify-center">{edit && <button type="button" className={redButtonSyle + " h-fit mt-1"} onClick={() => handleIpPull(ip)}>прибрати</button>}</div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                }
                <div className="flex gap-2 w-full">
                    {/* <div className="flex flex-col px-10 w-1/2 border rounded p-2">
                        {edit && <DepartamentPicker onChange={handleDepartamentSelect}/> || <label className="font-bold text-gray-600 text-xl text-center mt-2">відділ</label>}
                        <div className="text-2xl flex justify-center pb-4">{formData.departament?.name}</div>
                    </div> */}
                    {/* <div className="flex flex-col px-10 w-1/2 border rounded p-2">
                        {edit && <UserPicker closeAfterSubmit label="користувач" onChange={handleUserPick} self/> || <label className="font-bold text-gray-600 text-xl text-center mt-2">користувач</label>}
                        {formData.user && <div className="text-2xl flex justify-center pb-4">{`${formData.user?.nickname} (${formData.user?.name} ${formData.user?.surname} ${formData.user?.lastname})`}</div>}
                    </div> */}
                </div>
                {/* <div className="flex flex-col px-10 w-full border rounded p-2">
                    {edit && <UserPicker closeAfterSubmit label="відповідальний адміністратор" role="admin" onChange={handleAdminPick} self/> || <label className="font-bold text-gray-600 text-xl text-center mt-2">відповідальний адміністратор</label>}
                    {formData.admin && <div className="text-2xl flex justify-center pb-4">{`${formData.admin?.nickname} (${formData.admin?.name} ${formData.admin?.surname} ${formData.admin?.lastname})`}</div>}
                </div> */}
                <div className="flex flex-col gap-2">
                    <label className="font-bold text-gray-600 text-xl">обслуговування</label>
                    {edit && <ServicePusher pushHandler={handleServicePush}/>}
                    <div className="overflow-auto w-full">
                        <div className="flex gap-2 px-2 flex-col max-h-72">{formData.service.map((service: Service, index: number) => <div className="flex border rounded w-full justify-between gap-2 px-6 py-2">
                            <div className="grow overflow-auto">{service.service}</div>
                            <div className="text-gray-600 text-nowrap">
                                <DateFormater dayOfWeek value={service.date}/>
                            </div>
                            <div className="px-4">
                                <button className="text-red-600" type="button" onClick={() => handleServicePull(index)}>прибрати</button>
                            </div>
                        </div>)}</div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-bold text-gray-600 text-xs">наступне обслуговування</label>
                    {/* <input disabled={!edit}  defaultValue={moment(formData.nextService).format('YYYY-MM-DD')} className={inputStyle} type="date" onChange={handleChange} name="nextService"/> */}
                    <ReactDatePicker className={inputStyle + " w-full"} value={moment(formData.nextService).format('YYYY-MM-DD')} onChange={(date: Date|null) => {if(date) setFormData({...formData, nextService: date})}}/>
                </div>
                {showRecomendations && <div className="flex flex-col gap-2">
                    <label className="font-bold text-gray-600 text-xs">рекомендації до модернизації</label>
                    <input disabled={!deepEdit}  defaultValue={formData.modernization} className={inputStyle} type="text" onChange={handleModernisationChange} name="modernization"/>
                </div>}
                {showRecomendations && <div className="flex flex-col gap-2">
                    <label className="font-bold text-gray-600 text-xl">рекомендації до списання</label>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col gap-2 w-full">
                                <div className="font-bold text-gray-600 text-xs">Дата списання</div>
                                <ReactDatePicker className={inputStyle + " w-full"} disabled={!deepEdit} value={formData.utilization?.date} onChange={(date: Date | null) => {if(date) handleUtilizationDateChange(date)}}/>
                                {formData.utilization?.charge && <div className="flex gap-2 text-xl">
                                <input type="checkbox" checked={formData.utilization?.sell} onChange={handleSellChange}/>
                                <label>На продаж</label>
                        </div>}
                            </div>
                            {/* <div className="w-full border p-2 rounded">{deepEdit && <UserPicker closeAfterSubmit label="відповідальний за списання" role="admin" onChange={handleUtilizationChargeSelect} self/> || <label>відповідальний за списання</label>}
                                {formData.utilization?.charge && <div className="text-2xl flex justify-center pb-4">{formData.utilization?.charge?.name}</div>}
                            </div> */}
                        </div>
                        
                        { deepEdit && <div className="flex justify-center">
                            <button type="button" className={grayButtonStyle} onClick={() => setFormData({...formData, utilization: null})}>прибрати рекомендації</button>
                        </div>}
                        
                </div>}
            {edit && <div className="flex w-full justify-center mt-4">
                <div className="flex justify-center">
                    <button type="submit" className="text-xl rounded py-1 px-8 bg-blue-600 text-white">{buttonLabel}</button>
                </div>
            </div>}
        </form>
    </div>
}

export default observer(HardwareForm);