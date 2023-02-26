import { createTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";

export const theme: Theme = createTheme({
    palette:{
        background:{
            default:'#09090A'
        },
        primary:{
            main: "#673ab7"
        },
        secondary:{
            main: "#673ab7"
        },
    },
    typography:{
        button:{
            textTransform:'none'
        }
    }
})