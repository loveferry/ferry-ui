import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, Input, Form, Tooltip } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { useState } from 'react';
import { connect } from 'dva';
import { AutoComplete } from 'antd';
import styles from '../styles/codeGeneratorStyle.less';
const FormItem = Form.Item;
const { TextArea } = Input;


const CodeGeneratorView = props => {
  const [tableName, setTableName] = useState('');
  const [tableNameOptions, setTableNameOptions] = useState([]);

  const { loading, history, tableNames } = props;
  const [form] = Form.useForm();

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

  const filterTableName = values => {
    const { dispatch } = props;
    dispatch({
      type: 'sysSettings/tableNameQuery',
      payload: {
        tableName: values,
        page: 1,
        pageSize: 5
      }
    });
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


  const onTableNameSearch = searchText => {
    filterTableName(searchText);
    console.log(tableNames);
    setTableNameOptions(tableNames);
  };

  const onTableNameSelect = data => {
    console.log('select table name', data);
  };

  const onTableNameChange = data => {
    setTableName(data);
  };

  return (
    <Card bordered={false}>
      <Form
        hideRequiredMark
        style={{
          marginTop: 8,
        }}
        form={form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <FormItem
          {...formItemLayout}
          label={<FormattedMessage id="sysSettings.codeGenerator.tableName.label" />}
          name="tableName"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'sysSettings.codeGenerator.tableName.required',
              }),
            },
          ]}
        >
          <AutoComplete
            value={tableName}
            options={tableNameOptions}
            style={{
              width: 200,
            }}
            onSelect={onTableNameSelect}
            onSearch={onTableNameSearch}
            onChange={onTableNameChange}
            placeholder={formatMessage({
              id: 'sysSettings.codeGenerator.tableName.placeholder',
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
          <Button type="primary" htmlType="submit" loading={loading}>
            <FormattedMessage id="documentTemplateDefinition.form.submit" />
          </Button>
        </FormItem>
      </Form>
    </Card>
  );
};

export default connect(({ generateCode, loading }) => ({
  generateCode,
  loading: loading.models.generateCode,
}))(CodeGeneratorView);
