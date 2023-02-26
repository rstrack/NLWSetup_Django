import { ThemeProvider } from "@mui/system"
import { Box } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline";

import { Habits } from "./pages/habits";
import { theme } from "./theme"

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Box
          width={'100vw'}
          height={'100vh'}
          display={"flex"}
          alignItems='center'
          justifyContent={'center'}
        >

          <Habits/> {/* Por enquanto a única página */}
          
        </Box>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
