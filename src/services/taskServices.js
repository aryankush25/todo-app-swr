import ApiService from './apiService';
import { isPresentLocalStorageTokens } from '../utils/tokensHelper';
import { getArgumentNotPresentError } from './utils/errors';

export const createTask = (endpoint, description, completed) => {
  if (isPresentLocalStorageTokens()) {
    const APIObj = {
      endPoint: endpoint,
      authenticationRequired: true,
      method: 'POST',
      body: { description, completed }
    };

    return ApiService(APIObj);
  }

  throw getArgumentNotPresentError();
};

export const getTasks = (endpoint) => {
  if (isPresentLocalStorageTokens()) {
    const APIObj = {
      endPoint: endpoint,
      authenticationRequired: true,
      method: 'GET'
    };

    return ApiService(APIObj);
  }

  throw getArgumentNotPresentError();
};
