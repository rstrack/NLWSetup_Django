import { useEffect, useState } from "react";

import { api } from "../lib/axios";
import { SummaryTableExternalDiv, SummaryTableInternalDiv, WeekDaysText } from "../styles";
import { generateDateArray } from "../util/generate-date-array";
import DayComponent from "./dayComponent";

const weekDays = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D']

const minimumSummaryDatesSize = 18 * 7;

type Summary = {
    id: string;
    date: string;
    total_habits: number;
    completed_habits: number;
}[]

const SummaryTable = () => {

    const [summary, setSummary] = useState<Summary>([]);
    const [summaryDates, setSummaryDates] = useState<Array<Date>>([]);
    const [amountOfDaysToFill, setAmountOfDaysToFill] = useState<number>(minimumSummaryDatesSize);

    useEffect(() => {
        api.get("summary")
        .then((response) => {
            setSummary(response.data);
            setSummaryDates(
                response.data.length > 0 ? 
                generateDateArray(
                    new Date(response.data[0].date),
                    new Date()
                ) : [])
            setAmountOfDaysToFill(
                minimumSummaryDatesSize - 
                summaryDates.length - 
                (summaryDates.length > 0 ? 
                    (getWeekday(summaryDates[0])+1)%7 : 0
                ))
        });
    }, []);

    // retorna o dia da semana , sendo 0=seg, 1=ter, 2=qua ...
    const getWeekday = (date: Date) => [6, 0, 1, 2, 3, 4, 5][date.getDay()];

    return (
        <SummaryTableExternalDiv>
            <SummaryTableInternalDiv>
                {/* primeira coluna: dias da semana */}
                {weekDays.map((weekDay, index) => {
                    return (
                        <WeekDaysText key={index}>
                            {weekDay}
                        </WeekDaysText>
                    )})}
                {/* preenche com dias disabled até o primeiro dia cadastrado */}
                {summary.length > 0 && (
                    [...Array((getWeekday(summaryDates[0])+1)%7).keys()]
                    .map((key) => {
                        return <DayComponent key={key} disabled/>
                    })
                )}
                {/* preenche do primeiro dia cadastrado até o dia atual (dias válidos) */}
                {summary.length > 0 && (
                    summaryDates.map((date) => {
                        const actual = summary.find(
                            value => new Date(value.date).getTime() == date.getTime()
                        )
                        return (
                            <DayComponent 
                                key={String(date)} 
                                total={actual && actual.total_habits} 
                                completed={actual && actual.completed_habits}
                            />
                        )
                    })
                )}
                {/* completa o resumo com dias disabled */}
                {amountOfDaysToFill &&
                    [...Array(amountOfDaysToFill).keys()].map((key) => {
                        return <DayComponent key={key} disabled/>
                    })}
            </SummaryTableInternalDiv>
        </SummaryTableExternalDiv>
    )
}

export default SummaryTable