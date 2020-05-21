import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component, Fragment } from 'react';
import { List } from 'antd';

const passwordStrength = {
  strong: (
    <span className="strong">
      <FormattedMessage id="sysSettings.security.strong" defaultMessage="Strong" />
    </span>
  ),
  medium: (
    <span className="medium">
      <FormattedMessage id="sysSettings.security.medium" defaultMessage="Medium" />
    </span>
  ),
  weak: (
    <span className="weak">
      <FormattedMessage id="sysSettings.security.weak" defaultMessage="Weak" />
      Weak
    </span>
  ),
};

class SecurityView extends Component {
  getData = () => [
    {
      title: formatMessage(
        {
          id: 'sysSettings.security.password',
        },
        {},
      ),
      description: (
        <Fragment>
          {formatMessage({
            id: 'sysSettings.security.password-description',
          })}
          ：{passwordStrength.strong}
        </Fragment>
      ),
      actions: [
        <a key="Modify">
          <FormattedMessage id="sysSettings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'sysSettings.security.phone',
        },
        {},
      ),
      description: `${formatMessage(
        {
          id: 'sysSettings.security.phone-description',
        },
        {},
      )}：138****8293`,
      actions: [
        <a key="Modify">
          <FormattedMessage id="sysSettings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'sysSettings.security.question',
        },
        {},
      ),
      description: formatMessage(
        {
          id: 'sysSettings.security.question-description',
        },
        {},
      ),
      actions: [
        <a key="Set">
          <FormattedMessage id="sysSettings.security.set" defaultMessage="Set" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'sysSettings.security.email',
        },
        {},
      ),
      description: `${formatMessage(
        {
          id: 'sysSettings.security.email-description',
        },
        {},
      )}：ant***sign.com`,
      actions: [
        <a key="Modify">
          <FormattedMessage id="sysSettings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'sysSettings.security.mfa',
        },
        {},
      ),
      description: formatMessage(
        {
          id: 'sysSettings.security.mfa-description',
        },
        {},
      ),
      actions: [
        <a key="bind">
          <FormattedMessage id="sysSettings.security.bind" defaultMessage="Bind" />
        </a>,
      ],
    },
  ];

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

export default SecurityView;
