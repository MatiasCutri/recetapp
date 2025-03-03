import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';


export const recetappTheme = createTheme({
    palette: {
        primary: {
            main: '#f2ddc7'
        },
        secondary: {
            main: '#bfae9c'
        },
        tertiary:{
            main: '#a58f78'
        },
        error: {
            main: red.A400
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                ':root': {
                    '--primary-main': '#f2ddc7', 
                },
            },
        },
    },
})





