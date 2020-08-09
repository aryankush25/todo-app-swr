import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ToastContainer } from 'react-toastify';
import AppRoutes from '../../routes';
import mainTheme from '../../styles/mainTheme';

import 'react-toastify/dist/ReactToastify.css';
import 'fontsource-roboto';

const AppBoot = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />

      <div>
        <AppRoutes />
      </div>
    </ThemeProvider>
  );
};

export default AppBoot;
