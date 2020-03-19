import { fakeSubmitForm } from './service';
import {message} from "antd";

const Model = {
  namespace: 'documentTemplateDefinition',
  state: {},
  effects: {
    *submit({ payload, history }, { call }) {
      const response = yield call(fakeSubmitForm, payload);
      if(response.success){
        message.success('提交成功');
        history.push('/document/template');
      }else{
        message.error(response.message);
      }
    },
  },
};
export default Model;
