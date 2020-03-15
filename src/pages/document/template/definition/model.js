import { message } from 'antd';
import { fakeSubmitForm } from './service';

const Model = {
  namespace: 'documentTemplateDefinition',
  state: {},
  effects: {
    *submit({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
  },
};
export default Model;
