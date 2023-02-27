import { createTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";

export const theme: Theme = createTheme({
    palette:{
        background:{
            default:'#09090A'
        },
        primary:{
            main: '#673ab7',
            contrastText: '#FFFFFF'
        },
    },
    typography:{
        button:{
            textTransform:'none',
        },
        allVariants:{
            color:'white'
        }
    },
    components:{
        MuiButton:{
            variants:[
                {
                    props:{variant:"outlined"},
                    style:{
                        color:'#FFFFFF',
                        height: 48,
                    }
                }
            ]
        },
        MuiTextField:{
            variants:[
                {
                    props:{variant:"outlined"},
                    style:{
                        input:{
                            color:'#FFFFFF'
                        }
                    },

                }
            ]
        },
        MuiPopover:{
            defaultProps:{
                PaperProps:{
                    style:{
                        borderRadius:8, 
                        backgroundColor:'#18181b'
                    }
                }
            }
        }
    }
})