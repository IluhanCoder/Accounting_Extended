import { useEffect, useState } from "react";
import analyticsService, { StatisticsResponse } from "./analytics-service";
import LoadingScreen from "../misc/loading-screen";
import DatePicker from "../misc/date-picker";
import AnalyticsGraph from "./graph";
import { convertArray } from "./convert-array";
import { lightButtonStyle } from "../styles/button-syles";
import html2PDF from "jspdf-html2canvas";

export default function StatisticsPage() {
    const [data, setData] = useState<StatisticsResponse>();

    const extraDate = new Date();
    extraDate.setDate(extraDate.getDate() - 20)
    const [startDate, setStartDate] = useState<Date>(extraDate);
    const [endDate , setEndDate] = useState<Date>(new Date());

    const getData = async () => {
        const result = await analyticsService.getStatistics(startDate, endDate);
        setData({...result.result});
    }

    const handleDateChange = (newValue: {startDate: Date, endDate: Date}) => {
        setStartDate(newValue.startDate);
        setEndDate(newValue.endDate);
    }

    const generatePdf = async () => {
        const page = document.getElementById("results");
        const buttons = page?.querySelectorAll("button");
        buttons?.forEach((button: HTMLButtonElement) => {
            button.remove()
        })
        await html2PDF(page!, {
            jsPDF: {
              format: "a4",
            },
            imageType: "image/jpeg",
            output: "./pdf/generate.pdf",
          });
      };

    useEffect(() => { getData() }, [startDate, endDate]);

    if(data) return <div id="results" className="flex w-full flex-col p-4">
        <div className="flex w-full justify-center">
            <DatePicker className="flex gap-10" value={{startDate, endDate}} handleChange={handleDateChange}/>
        </div>
        <div className="flex flex-col gap-2">
            <div className="flex flex-col p-6 gap-2">
                <div className="flex justify-center">
                    <label className="text-2xl">статистика експлуатації обладнання</label>
                </div>
                <div className="flex justify-center">
                    <AnalyticsGraph data={convertArray(data.expStatistics)} name="кількість"/>
                </div>
            </div>
            <div className="flex flex-col p-6 gap-2">
                <div className="flex justify-center">
                    <label className="text-2xl">статистика витрат на обладнання</label>
                </div>
                <div className="flex justify-center">
                <AnalyticsGraph data={convertArray(data.spendStatistics)} name="кількість"/>
                </div>
            </div>
            <div className="flex flex-col p-6 gap-2">
                <div className="flex justify-center">
                    <label className="text-2xl">статистика оновлення обладнання</label>
                </div>
                <div className="flex justify-center">
                    <AnalyticsGraph data={convertArray(data.updateStatistics)} name="кількість"/>
                </div>
            </div>
            <div className="flex justify-center p-6">
                <button className={lightButtonStyle} type="button" onClick={generatePdf}>Завантажити звіт</button>
        </div>
        </div>
    </div>
    else return <LoadingScreen/>
}