import request from '@/utils/request';

export async function queryFakeList(params) {
  /*return request('/api/fake_list', {
    params,
  });*/
  return request('/api/doc/template/query',{params,})
}
