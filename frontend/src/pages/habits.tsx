
import { Grid } from "@mui/material"

import { Header } from "../components/header"
import SummaryTable from "../components/summaryTable"
import { SummaryProvider } from "../contexts/summaryContext"
import { HabitsExternalGrid } from "../styles"


export const Habits = () =>{

    return(
      <SummaryProvider>
        <HabitsExternalGrid container>
          
          <Grid item xs={12}>
            <Header/>
          </Grid>
          <Grid item xs={12}>
            <SummaryTable/>
          </Grid>

        </HabitsExternalGrid>
      </SummaryProvider>
    )
}