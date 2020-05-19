import { query } from './service';
import {notification} from "antd";

const Model = {
  namespace: 'templateParam',
  state: {
    list: [],
  },
  effects: {
    *query({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response ? response.maps : []) ? response : [],
      });
    },
  },
  reducers: {
    queryList(state, {payload}) {
      if(!payload.success){
        notification.error({
          message: `查询错误`,
          description: payload.message,
        });
        return ;
      }
      return { ...state, list: payload.maps };
    },
  },
};
export default Model;
