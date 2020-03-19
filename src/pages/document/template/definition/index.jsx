import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, Input, Form, Tooltip } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';
const FormItem = Form.Item;
const { TextArea } = Input;

const Definition = props => {
  const { submitting } = props;
  const { history } = props;
  const { template } = { ...{}, template: props.location.params || {} };
  const [form] = Form.useForm();
  const [setShowPublicUsers] = React.useState(false);
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 7,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 12,
      },
      md: {
        span: 10,
      },
    },
  };
  const submitFormLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 10,
        offset: 7,
      },
    },
  };

  const onFinish = values => {
    const { dispatch } = props;
    dispatch({
      type: 'documentTemplateDefinition/submit',
      payload: values,
      history: history,
    });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = changedValues => {
    const { publicType } = changedValues;
    if (publicType) setShowPublicUsers(publicType === '2');
  };

  return (
    <PageHeaderWrapper
      content={<FormattedMessage id="documentTemplateDefinition.basic.description" />}
    >
      <Card bordered={false}>
        <Form
          hideRequiredMark
          style={{
            marginTop: 8,
          }}
          form={form}
          name="basic"
          initialValues={{
            templateCode: template.templateCode,
            templateName: template.templateName,
            templateImage: template.templateImage,
            description: template.description,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="documentTemplateDefinition.templateCode.label" />}
            name="templateCode"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'documentTemplateDefinition.templateCode.required',
                }),
              },
            ]}
          >
            <Input
              disabled={template.templateCode}
              placeholder={formatMessage({
                id: 'documentTemplateDefinition.templateCode.placeholder',
              })}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="documentTemplateDefinition.templateName.label" />}
            name="templateName"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'documentTemplateDefinition.templateName.required',
                }),
              },
            ]}
          >
            <Input
              placeholder={formatMessage({
                id: 'documentTemplateDefinition.templateName.placeholder',
              })}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="documentTemplateDefinition.description.label" />}
            name="description"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'documentTemplateDefinition.description.required',
                }),
              },
            ]}
          >
            <TextArea
              style={{
                minHeight: 32,
              }}
              placeholder={formatMessage({
                id: 'documentTemplateDefinition.description.placeholder',
              })}
              rows={4}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                <FormattedMessage id="documentTemplateDefinition.templateImage.label" />
                <em className={styles.optional}>
                  <FormattedMessage id="documentTemplateDefinition.form.optional" />
                  <Tooltip
                    title={<FormattedMessage id="documentTemplateDefinition.templateImage.tooltip" />}
                  >
                    <InfoCircleOutlined
                      style={{
                        marginRight: 4,
                      }}
                    />
                  </Tooltip>
                </em>
              </span>
            }
            name="templateImage"
          >
            <Input
              placeholder={formatMessage({
                id: 'documentTemplateDefinition.templateImage.placeholder',
              })}
            />
          </FormItem>
          <FormItem
            {...submitFormLayout}
            style={{
              marginTop: 32,
            }}
          >
            <Button type="primary" htmlType="submit" loading={submitting}>
              <FormattedMessage id="documentTemplateDefinition.form.submit" />
            </Button>
          </FormItem>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ loading }) => ({
  submitting: loading.effects['documentTemplateDefinition/submit'],
}))(Definition);
