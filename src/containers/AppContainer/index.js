import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import MenuAppBar from '../../containers/MenuAppBar';
import { useLogoutUserHook } from '../../services/hooks/userHooks';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1
  }
}));

const AppContainer = ({ children }) => {
  const classes = useStyles();
  const { isLoading, startLogout } = useLogoutUserHook();

  return (
    <div>
      <MenuAppBar startLogout={startLogout} />

      {children}

      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress />
      </Backdrop>
    </div>
  );
};

export default AppContainer;
