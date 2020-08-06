import useSWR from 'swr';
import { loginUser, getCurrentUser } from '../userServices';
import { loginUserEndPoint, getCurrentUserEndPoint } from '../api/usersApis';

export const useLoginUserHook = () => {
  const { data, mutate } = useSWR(getCurrentUserEndPoint, getCurrentUser, {
    shouldRetryOnError: false
  });

  const startLogin = async (email, password) => {
    try {
      const response = await loginUser(loginUserEndPoint, email, password);

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
