import useSWR from 'swr';
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

export const useGetCurrentUserHook = () => {
  const { data, mutate } = useSWR(API.getCurrentUserEndPoint, getCurrentUser, {
    shouldRetryOnError: false
  });

  return {
    data,
    mutate
  };
};

export const useLoginUserHook = () => {
  const { data, mutate } = useGetCurrentUserHook();

  const startLogin = async (email, password) => {
    try {
      const response = await loginUser(API.loginUserEndPoint, email, password);

      setLocalStorageTokens({
        userEmail: response.user.email,
        accessToken: response.token
      });

      toast.success('Login successfull!');

      mutate({ ...response.user });
    } catch (error) {
      toast.error('Email/Password incorrect!');
    }
  };

  return {
    user: data,
    startLogin
  };
};

export const useRegisterUserHook = () => {
  const { data, mutate } = useGetCurrentUserHook();

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
    } catch (error) {
      toast.error('Unable to register!');
    }
  };

  return {
    user: data,
    startRegister
  };
};

export const useLogoutUserHook = () => {
  const { data, mutate } = useGetCurrentUserHook();

  const startRegister = async () => {
    try {
      await logoutUser(API.logoutUserEndPoint);

      clearLocalStorageTokens();

      toast.success('Logout successfull!');

      mutate({});
    } catch (error) {
      toast.error('Unable to logout!');
    }
  };

  return {
    user: data,
    startRegister
  };
};
