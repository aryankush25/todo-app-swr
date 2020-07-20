import _ from 'lodash';
import humps from 'humps';

export const isNilOrEmpty = (value) =>
  _.isNil(value) || _.isEmpty(value) || _.isNull(value) || _.isNaN(value);

export const isPresent = (value) => !isNilOrEmpty(value);

export const getResponseBody = (response) => {
  const camelizeResponse = humps.camelizeKeys(response);

  return camelizeResponse.data;
};
