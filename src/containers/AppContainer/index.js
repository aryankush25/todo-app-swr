import React from 'react';
import Box from '@material-ui/core/Box';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import MenuAppBar from '../../containers/MenuAppBar';
import { useLogoutUserHook } from '../../services/hooks/userHooks';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  childrenContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1
  }
}));

const AppContainer = ({ children }) => {
  const classes = useStyles();
  const { isLoading, startLogout } = useLogoutUserHook();

  return (
    <Box className={classes.mainContainer}>
      <MenuAppBar startLogout={startLogout} />

      <Box className={classes.childrenContainer} pb={8}>
        {children}
      </Box>

      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress />
      </Backdrop>
    </Box>
  );
};

export default AppContainer;
