import { queryFakeList, downloadFile } from './service';
import {notification, message} from "antd";

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
