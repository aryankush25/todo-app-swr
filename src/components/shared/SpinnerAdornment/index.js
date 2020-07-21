import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

export const useSpinnerStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 20
  }
}));

const SpinnerAdornment = (props) => {
  const classes = useSpinnerStyles();

  return <CircularProgress className={classes.root} size={20} />;
};

export default SpinnerAdornment;
