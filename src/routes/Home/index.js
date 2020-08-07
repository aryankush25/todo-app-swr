import React from 'react';
import { useLogoutUserHook } from '../../services/hooks/userHooks';
import { Button } from '@material-ui/core';
import SpinnerAdornment from '../../components/shared/SpinnerAdornment';

const Home = () => {
  const { isLoading, startLogout } = useLogoutUserHook();

  return (
    <div>
      This Home Page
      <Button
        variant="contained"
        color="primary"
        disabled={isLoading}
        onClick={startLogout}
      >
        Logout
        {isLoading && <SpinnerAdornment />}
      </Button>
    </div>
  );
};

export default Home;
