import { createContext, ReactNode, useState } from "react";

import { api } from "../lib/axios";
import { generateDateArray } from "../util/date-utils";

type Summary = {
    id: string;
    date: string;
    total_habits: number;
    completed_habits: number;
}[]

type SummaryContextData = {
    summary: Summary
    summaryDates: Date[]
    getSummary: () => void
}

type SummaryProviderProps = {
    children: ReactNode
}

export const SummaryContext = createContext({} as SummaryContextData)

export const SummaryProvider = ({children}: SummaryProviderProps) =>{

    const [summary, setSummary] = useState<Summary>([]);
    const [summaryDates, setSummaryDates] = useState<Array<Date>>([]);

    const getSummary = () =>{
        api.get("summary")
        .then((response) => {
            setSummary(response.data);

            setSummaryDates(
                response.data.length > 0 ? 
                generateDateArray(
                    new Date(response.data[0].date),
                    new Date()
                ) : [])
            
        });
    }

    return(
        <SummaryContext.Provider value={{summary, summaryDates, getSummary}}>
            {children}
        </SummaryContext.Provider>
    )
}
