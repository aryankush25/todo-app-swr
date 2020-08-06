import ApiService from './apiService';
import { isPresentLocalStorageTokens } from '../utils/tokensHelper';
import { getArgumentNotPresentError } from './utils/errors';

export const createUser = (endpoint, name, email, password) => {
  const APIObj = {
    endPoint: endpoint,
    authenticationRequired: false,
    method: 'POST',
    body: { name, email, password }
  };

  return ApiService(APIObj);
};

export const loginUser = (endpoint, email, password) => {
  const APIObj = {
    endPoint: endpoint,
    authenticationRequired: false,
    method: 'POST',
    body: { email, password }
  };

  return ApiService(APIObj);
};

export const logoutUser = (endpoint) => {
  if (isPresentLocalStorageTokens()) {
    const APIObj = {
      endPoint: endpoint,
      authenticationRequired: true,
      method: 'POST'
    };

    return ApiService(APIObj);
  }

  throw getArgumentNotPresentError();
};

export const getCurrentUser = (endpoint) => {
  if (isPresentLocalStorageTokens()) {
    const APIObj = {
      endPoint: endpoint,
      authenticationRequired: true,
      method: 'POST'
    };

    return ApiService(APIObj);
  }

  throw getArgumentNotPresentError();
};
