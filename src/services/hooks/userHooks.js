import { useState } from 'react';
import useSWR from 'swr';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  createUser,
  loginUser,
  getCurrentUser,
  logoutUser
} from '../userServices';
import * as API from '../api/usersApis';
import {
  setLocalStorageTokens,
  clearLocalStorageTokens
} from '../../utils/tokensHelper';
import { HOME_ROUTE, LOGIN_ROUTE } from '../../utils/routesConstants';

export const useGetCurrentUserHook = () => {
  const { data, mutate } = useSWR(API.getCurrentUserEndPoint, getCurrentUser, {
    shouldRetryOnError: false
  });

  return {
    user: data,
    mutate
  };
};

export const useLoginUserHook = () => {
  const history = useHistory();

  const { user, mutate } = useGetCurrentUserHook();

  const startLogin = async (email, password) => {
    try {
      const response = await loginUser(API.loginUserEndPoint, email, password);

      setLocalStorageTokens({
        userEmail: response.user.email,
        accessToken: response.token
      });

      toast.success('Login successfull!');

      mutate({ ...response.user });

      history.push(HOME_ROUTE);
    } catch (error) {
      toast.error('Email/Password incorrect!');
    }
  };

  return {
    user: user,
    startLogin
  };
};

export const useRegisterUserHook = () => {
  const history = useHistory();
  const { user, mutate } = useGetCurrentUserHook();

  const startRegister = async (firstName, lastName, email, password) => {
    try {
      const response = await createUser(
        API.createUserEndPoint,
        `${firstName} ${lastName}`,
        email,
        password
      );

      setLocalStorageTokens({
        userEmail: response.user.email,
        accessToken: response.token
      });

      toast.success('Register successfull!');

      mutate({ ...response.user });

      history.push(HOME_ROUTE);
    } catch (error) {
      toast.error('Unable to register!');
    }
  };

  return {
    user: user,
    startRegister
  };
};

export const useLogoutUserHook = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { user, mutate } = useGetCurrentUserHook();

  const startLogout = async () => {
    setIsLoading(true);

    try {
      await logoutUser(API.logoutUserEndPoint);

      clearLocalStorageTokens();

      toast.success('Logout successfull!');

      mutate({});

      setIsLoading(false);

      history.push(LOGIN_ROUTE);
    } catch (error) {
      toast.error('Unable to logout!');
      setIsLoading(false);
    }
  };

  return {
    user: user,
    isLoading,
    startLogout
  };
};
