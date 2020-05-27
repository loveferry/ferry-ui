import {Button, Card, Input, Form, Checkbox, Row, Col, message} from 'antd';
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
    let generateCode = {...values};
    if(values.generateFlag.length === 0){
      message.warn("生成标识勾选数量未0，无意义的提交");
      return ;
    }
    for (let i = 0; i < values.generateFlag.length; i++) {
      generateCode[values.generateFlag[i]] = 'Y';
    }
    axios.post('/api/generate/code', generateCode)
      .then(function (response) {
        if(response){
          message.success("生成成功!");
        }
      })
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const loadTableNameOptions = tableNames => {
    if(tableNames.length>0){
      tableNames.forEach(e => e.value = e.tableName);
    }
  };

  const onTableNameSearch = searchText => {
    axios.get('/api/table/name/query', {
      params: {
        tableName: searchText,
        page: 1,
        pageSize: 5
      }
    })
      .then(function (data) {
        loadTableNameOptions(data);
        setTableNameOptions(data);
      })
  };

  const onTableNameSelect = (data, option) => {
    form.setFieldsValue({
      'entityName': option.entityName,
      'mapperJavaName': option.mapperJavaName,
      'mapperXmlName': option.mapperXmlName,
      'serviceName': option.serviceName,
      'serviceImplName': option.serviceImplName,
      'controllerName': option.controllerName,
      'entityFlag': option.entityFlag,
    });
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
        initialValues={{
          projectPath: '/Users/ferry/workspace/ferry/ferry/base',
          packagePath: 'cn.org.ferry.sys',
          generateFlag: [
            'entityFlag',
            'mapperJavaFlag',
            'mapperXmlFlag',
            'serviceFlag',
            'serviceImplFlag',
            'controllerFlag'
          ],
        }}
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
          {...formItemLayout}
          label={<FormattedMessage id="sysSettings.codeGenerator.generateFlag.label" />}
          name="generateFlag"
        >
          <Checkbox.Group style={{ width: '100%' }}>
            <Row>
              <Col span={8}>
                <Checkbox value="entityFlag">实体类</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="mapperJavaFlag">mybatis接口类</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="mapperXmlFlag">mybatis映射器</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="serviceFlag">业务接口类</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="serviceImplFlag">业务实现类</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="controllerFlag">控制器</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </FormItem>

        <FormItem
          {...submitFormLayout}
          style={{
            marginTop: 32,
          }}
        >
          <Button type="primary" htmlType="submit" loading={loading}>
            <FormattedMessage id="sysSettings.codeGenerator.form.label" />
          </Button>
        </FormItem>
      </Form>
    </Card>
  );
};

export default connect(({ _, loading }) => ({
  _,
  loading: loading.models._,
}))(CodeGeneratorView);
