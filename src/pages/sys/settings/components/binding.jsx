import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { AlipayOutlined, DingdingOutlined, TaobaoOutlined } from '@ant-design/icons';
import { List } from 'antd';
import React, { Component, Fragment } from 'react';

class BindingView extends Component {
  getData = () => [
    {
      title: formatMessage(
        {
          id: 'sysSettings.binding.taobao',
        },
        {},
      ),
      description: formatMessage(
        {
          id: 'sysSettings.binding.taobao-description',
        },
        {},
      ),
      actions: [
        <a key="Bind">
          <FormattedMessage id="sysSettings.binding.bind" defaultMessage="Bind" />
        </a>,
      ],
      avatar: <TaobaoOutlined className="taobao" />,
    },
    {
      title: formatMessage(
        {
          id: 'sysSettings.binding.alipay',
        },
        {},
      ),
      description: formatMessage(
        {
          id: 'sysSettings.binding.alipay-description',
        },
        {},
      ),
      actions: [
        <a key="Bind">
          <FormattedMessage id="sysSettings.binding.bind" defaultMessage="Bind" />
        </a>,
      ],
      avatar: <AlipayOutlined className="alipay" />,
    },
    {
      title: formatMessage(
        {
          id: 'sysSettings.binding.dingding',
        },
        {},
      ),
      description: formatMessage(
        {
          id: 'sysSettings.binding.dingding-description',
        },
        {},
      ),
      actions: [
        <a key="Bind">
          <FormattedMessage id="sysSettings.binding.bind" defaultMessage="Bind" />
        </a>,
      ],
      avatar: <DingdingOutlined className="dingding" />,
    },
  ];

  render() {
    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={this.getData()}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta
                avatar={item.avatar}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default BindingView;
