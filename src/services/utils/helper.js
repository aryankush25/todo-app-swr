import httpStatus from 'http-status';

export const getErrorData = (errorCode) => {
  const label = httpStatus[errorCode];
  const name = httpStatus[`${errorCode}_NAME`];
  const message = httpStatus[`${errorCode}_MESSAGE`];

  const error = new Error(message);

  error.responseStatus = errorCode;
  error.label = label;
  error.name = name;

  return error;
};
