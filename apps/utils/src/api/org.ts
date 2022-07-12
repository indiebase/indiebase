import { useQuery } from 'react-query';
import { req } from './request';

export const useApiOrgs = function () {
  return useQuery(['own-orgs'], async () => {
    const { data } = await req.get('/v1/org/');
    return data;
  });
};
