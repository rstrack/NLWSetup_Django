import { useContext, useEffect } from "react";

import DayComponent from "./dayComponent";
import { SummaryTableExternalDiv, SummaryTableInternalDiv, WeekDaysText } from "../styles";
import { SummaryContext } from "../contexts/summaryContext";
import { timeZoneOffsetMillis } from "../util/date-utils";

const weekDays = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D']

const minimumSummaryDatesSize = 18 * 7;

const SummaryTable = () => {

    const {summary, summaryDates, getSummary} = useContext(SummaryContext)

    useEffect(() => {
        getSummary();
    }, []);

    // retorna o dia da semana , sendo 0=seg, 1=ter, 2=qua ...
    const getWeekday = (date: Date) => [6, 0, 1, 2, 3, 4, 5][date.getDay()];

    const amountOfDaysToFill = 
        minimumSummaryDatesSize - 
        summaryDates.length - 
        (summaryDates.length > 0 ? 
            (getWeekday(summaryDates[0])) : 0
        )

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
                    [...Array(getWeekday(summaryDates[0])).keys()]
                    .map((key) => {
                        return <DayComponent key={key} disabled/>
                    })
                )}
                {/* preenche do primeiro dia cadastrado até o dia atual (dias válidos) */}
                {summary.length > 0 && (
                    summaryDates.map((date) => {
                        const actual = summary.find(
                            value => new Date(value.date).getTime() + timeZoneOffsetMillis() === date.getTime()
                        )
                        return (
                            <DayComponent 
                                key={String(date)} 
                                total={actual && actual.total_habits} 
                                completed={actual && actual.completed_habits}
                                date={date}
                                getSummary={getSummary}
                            />
                        )
                    })
                )}
                {/* completa o resumo com dias disabled */}
                {[...Array(amountOfDaysToFill).keys()].map((key) => {
                        return <DayComponent key={key} disabled/>
                })}
            </SummaryTableInternalDiv>
        </SummaryTableExternalDiv>
    )
}

export default SummaryTable