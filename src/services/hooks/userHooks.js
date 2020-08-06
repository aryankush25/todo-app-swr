import useSWR from 'swr';
import { toast } from 'react-toastify';
import { createUser, loginUser, getCurrentUser } from '../userServices';
import * as API from '../api/usersApis';
import { setLocalStorageTokens } from '../../utils/tokensHelper';

export const useLoginUserHook = () => {
  const { data, mutate } = useSWR(API.getCurrentUserEndPoint, getCurrentUser, {
    shouldRetryOnError: false
  });

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
  const { data, mutate } = useSWR(API.getCurrentUserEndPoint, getCurrentUser, {
    shouldRetryOnError: false
  });

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
