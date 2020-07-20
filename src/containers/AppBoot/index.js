import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'fontsource-roboto';
import AppRoutes from '../../routes';

const AppBoot = () => {
  return (
    <Fragment>
      <CssBaseline />

      <div>
        <AppRoutes />
      </div>
    </Fragment>
  );
};

export default AppBoot;
