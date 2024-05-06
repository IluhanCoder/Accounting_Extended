import moment from "moment"
import { ChangeEvent, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { smallInputStyle } from "../styles/form-styles";

interface LocalParams {
    value: {startDate: Date, endDate: Date} | null,
    handleChange: ({startDate, endDate}: {startDate: Date, endDate: Date}) => void
}

function DatePicker({handleChange, value}: LocalParams) {
    const tempDate = new Date();
    tempDate.setDate((new Date()).getDate() + 10);

    const changeStartDateHandler = (date: Date) => {
        const newValue = new Date(date);
        handleChange({startDate: newValue, endDate: (value) ? value.endDate: tempDate});
    }

    const changeEndDateHandler = (date: Date) => {
        const newValue = new Date(date);
        handleChange({startDate: (value) ? value.startDate : new Date(), endDate: newValue});
    }

    return <div>
        <div>
            <div>дата початку</div>
            {/* <input type="date" defaultValue={moment((value) ? value.startDate : new Date()).format('YYYY-MM-DD')} onChange={changeStartDateHandler}/> */}
            <ReactDatePicker locale="ua" className={smallInputStyle} value={moment((value) ? value.startDate : new Date()).format('YYYY-MM-DD')} onChange={changeStartDateHandler}/>
        </div>
        <div>
            <div>дата кінця</div>
            {/* <input type="date" defaultValue={moment((value) ? value.endDate: tempDate).format('YYYY-MM-DD')} onChange={changeEndDateHandler}/> */}
            <ReactDatePicker locale="ua" className={smallInputStyle} value={moment((value) ? value.endDate : new Date()).format('YYYY-MM-DD')} onChange={changeEndDateHandler}/>
        </div>
    </div>
}

export default DatePicker