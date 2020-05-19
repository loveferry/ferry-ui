import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { query, updateRule, addRule, removeRule } from './service';
import {connect} from "dva";
/**
 * 添加节点
 * @param fields
 */

const handleAdd = async fields => {
  const hide = message.loading('正在添加');

  try {
    await addRule({
      desc: fields.desc,
    });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async fields => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async selectedRows => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map(row => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList = props => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef();
  // const {param, loading,} = props;

 /* function query(params){
    const { dispatch } = props;
    dispatch({
      type: 'templateParam/query',
      payload: {...params, page: params.current, templateCode: props.match.params.code},
    });
  }*/

 function test(e) {
   debugger
 }
  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="参数列表"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={() => [
          <Button icon={<PlusOutlined />} type="primary" onClick={() => handleModalVisible(true)}>
            新建
          </Button>,
        ]}
        request={params => query({...params, page: params.current, templateCode: props.match.params.code})
          .then(res =>{
            if(res.success && res.maps.length > 0){
              return {
                data:res.maps,
                total:res.maps.length,
                success:true,
                pageSize:10,
                current:1
              }
            }
            return {}
          })
        }
        columns={[
          {
            title: '参数名称',
            key: 'paramName',
            dataIndex: 'paramName',
          },
          {
            title: '书签名称',
            key: 'bookMark',
            dataIndex: 'bookMark',
          },
          {
            title: '参数类型',
            key: 'paramType',
            dataIndex: 'paramType',
            valueEnum: {
              0: {
                text: '文本',
                status: 'TEXT',
              },
              1: {
                text: '列表',
                status: 'LIST',
              },
              2: {
                text: '图片',
                status: 'IMAGE',
              },
            },
          },
          {
            title: '数据源',
            key: 'sqlCode',
            dataIndex: 'sqlCode',
            sorter: true,
          },
          {
            title: '操作',
            key: 'action',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => (
              <>
                <a
                  onClick={() => {
                    handleUpdateModalVisible(true);
                    setStepFormValues(record);
                  }}
                >
                  配置
                </a>
                <Divider type="vertical" />
                <a href="">订阅警报</a>
              </>
            ),
          },
        ]}
      />
      <CreateForm
        onSubmit={async value => {
          const success = await handleAdd(value);

          if (success) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async value => {
            const success = await handleUpdate(value);

            if (success) {
              handleModalVisible(false);
              setStepFormValues({});

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default connect(({ param, loading }) => ({
  param,
  loading: loading.models.param,
}))(TableList);
