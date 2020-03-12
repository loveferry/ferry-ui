import { queryFakeList } from './service';

const Model = {
  namespace: 'template',
  state: {
    list: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response ? response.maps : []) ? response : [],
      });
    },
  },
  reducers: {
    queryList(state, {payload}) {
      return { ...state, list: payload.maps };
    },
  },
};
export default Model;
