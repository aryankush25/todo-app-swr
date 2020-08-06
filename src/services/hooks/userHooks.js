import useSWR from 'swr';
import { loginUser, getCurrentUser } from '../userServices';
import * as API from '../api/usersApis';
import { setLocalStorageTokens } from '../../utils/tokensHelper';

export const useLoginUserHook = () => {
  const { data, mutate } = useSWR(API.getCurrentUserEndPoint, getCurrentUser, {
    shouldRetryOnError: false
  });

  const startLogin = async (email, password) => {
    try {
      const response = await loginUser(API.loginUserEndPoint, email, password);

      console.log({ response });

      setLocalStorageTokens({
        userEmail: response.user.email,
        accessToken: response.token
      });

      mutate({ ...response.user });
    } catch (error) {
      console.log('error', error);
    }
  };

  console.log({ data, mutate });

  return {
    user: data,
    startLogin
  };
};
