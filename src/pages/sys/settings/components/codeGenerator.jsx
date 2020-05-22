import { Button, Card, Input, Form } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { useState } from 'react';
import { connect } from 'dva';
import { AutoComplete } from 'antd';
import axios from '@/utils/axios';
const FormItem = Form.Item;


const CodeGeneratorView = props => {
  const [tableName, setTableName] = useState('');
  const [tableNameOptions, setTableNameOptions] = useState([]);

  const { loading, history } = props;
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

  const loadTableNameOptions = tableNames => {
    tableNames.forEach(e => e.value = e.tableName);
  };

  const onTableNameSearch = searchText => {
    axios.get('/api/table/name/query', {
      params: {
        tableName: searchText,
        page: 1,
        pageSize: 5
      }
    })
      .then(function (response) {
        loadTableNameOptions(response.maps);
        setTableNameOptions(response.maps);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onTableNameSelect = (data, option) => {

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
          label={<FormattedMessage id="sysSettings.codeGenerator.projectPath.label" />}
          name="projectPath"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'sysSettings.codeGenerator.projectPath.required',
              }),
            },
          ]}
        >
          <Input
            placeholder={formatMessage({
              id: 'sysSettings.codeGenerator.projectPath.placeholder',
            })}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={<FormattedMessage id="sysSettings.codeGenerator.packagePath.label" />}
          name="packagePath"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'sysSettings.codeGenerator.packagePath.required',
              }),
            },
          ]}
        >
          <Input
            placeholder={formatMessage({
              id: 'sysSettings.codeGenerator.packagePath.placeholder',
            })}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={<FormattedMessage id="sysSettings.codeGenerator.entityName.label" />}
          name="entityName"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'sysSettings.codeGenerator.entityName.required',
              }),
            },
          ]}
        >
          <Input
            placeholder={formatMessage({
              id: 'sysSettings.codeGenerator.entityName.placeholder',
            })}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={<FormattedMessage id="sysSettings.codeGenerator.mapperJavaName.label" />}
          name="mapperJavaName"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'sysSettings.codeGenerator.mapperJavaName.required',
              }),
            },
          ]}
        >
          <Input
            placeholder={formatMessage({
              id: 'sysSettings.codeGenerator.mapperJavaName.placeholder',
            })}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={<FormattedMessage id="sysSettings.codeGenerator.mapperXmlName.label" />}
          name="mapperXmlName"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'sysSettings.codeGenerator.mapperXmlName.required',
              }),
            },
          ]}
        >
          <Input
            placeholder={formatMessage({
              id: 'sysSettings.codeGenerator.mapperXmlName.placeholder',
            })}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={<FormattedMessage id="sysSettings.codeGenerator.serviceName.label" />}
          name="serviceName"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'sysSettings.codeGenerator.serviceName.required',
              }),
            },
          ]}
        >
          <Input
            placeholder={formatMessage({
              id: 'sysSettings.codeGenerator.serviceName.placeholder',
            })}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={<FormattedMessage id="sysSettings.codeGenerator.serviceImplName.label" />}
          name="serviceImplName"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'sysSettings.codeGenerator.serviceImplName.required',
              }),
            },
          ]}
        >
          <Input
            placeholder={formatMessage({
              id: 'sysSettings.codeGenerator.serviceImplName.placeholder',
            })}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={<FormattedMessage id="sysSettings.codeGenerator.controllerName.label" />}
          name="controllerName"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'sysSettings.codeGenerator.controllerName.required',
              }),
            },
          ]}
        >
          <Input
            placeholder={formatMessage({
              id: 'sysSettings.codeGenerator.controllerName.placeholder',
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
