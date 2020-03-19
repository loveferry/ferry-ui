import request from '@/utils/request';

export async function fakeSubmitForm(params) {
  return request('/api/doc/template/definition', {
    method: 'POST',
    data: params,
  });
}
