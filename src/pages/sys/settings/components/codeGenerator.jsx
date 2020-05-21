import { List, Switch } from 'antd';
import React, { Component, Fragment } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';

class CodeGeneratorView extends Component {
  getData = () => {
    const Action = (
      <Switch
        checkedChildren={formatMessage({
          id: 'sysSettings.settings.open',
        })}
        unCheckedChildren={formatMessage({
          id: 'sysSettings.settings.close',
        })}
        defaultChecked
      />
    );
    return [
      {
        title: formatMessage(
          {
            id: 'sysSettings.notification.password',
          },
          {},
        ),
        description: formatMessage(
          {
            id: 'sysSettings.notification.password-description',
          },
          {},
        ),
        actions: [Action],
      },
      {
        title: formatMessage(
          {
            id: 'sysSettings.notification.messages',
          },
          {},
        ),
        description: formatMessage(
          {
            id: 'sysSettings.notification.messages-description',
          },
          {},
        ),
        actions: [Action],
      },
      {
        title: formatMessage(
          {
            id: 'sysSettings.notification.todo',
          },
          {},
        ),
        description: formatMessage(
          {
            id: 'sysSettings.notification.todo-description',
          },
          {},
        ),
        actions: [Action],
      },
    ];
  };

  render() {
    const data = this.getData();
    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default CodeGeneratorView;
