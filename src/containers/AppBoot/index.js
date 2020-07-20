import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'fontsource-roboto';
import AppRoutes from '../../routes';
import mainTheme from '../../styles/mainTheme';

const AppBoot = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />

      <div>
        <AppRoutes />
      </div>
    </ThemeProvider>
  );
};

export default AppBoot;
