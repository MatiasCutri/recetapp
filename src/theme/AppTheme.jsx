import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import { recetappTheme } from './';


export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={ recetappTheme }>
      <CssBaseline />
      { children }
    </ThemeProvider>
  )
}