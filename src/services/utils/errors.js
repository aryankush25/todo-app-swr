import httpStatus from 'http-status';
import { getErrorData } from './helper';

export const getArgumentNotPresentError = () => {
  const error = getErrorData(httpStatus.BAD_REQUEST);

  return error;
};
