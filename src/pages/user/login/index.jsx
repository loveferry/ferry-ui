import React, {useState} from "react";
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import {Checkbox} from 'antd';
import LoginComponents from './components/Login';
import styles from './style.less';
import axios from '@/utils/axios';
import { getPageQuery, setAuthority } from './utils/utils';

const { Tab, UserName, Password, Submit } = LoginComponents;


const Login = props => {
  const [type, setType] = useState('JSON');
  const [autoLogin, setAutoLogin] = useState(true);
  const [loginForm, setLoginForm] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onTabChange = type => {
    setType(type);
  };

  const handleSubmit = (err, values) => {
    if (!err) {
      setSubmitting(true);
      axios.post('/api/login?type=JSON', values)
        .then(function (response) {
          if(response){
            // 存放token
            localStorage.setItem('access_token', response[0].access_token);
            localStorage.setItem('refresh_token', response[0].refresh_token);

            const urlParams = new URL(window.location.href);
            const params = getPageQuery();
            let { redirect } = params;

            if (redirect) {
              const redirectUrlParams = new URL(redirect);

              if (redirectUrlParams.origin === urlParams.origin) {
                redirect = redirect.substr(urlParams.origin.length);

                if (redirect.match(/^\/.*#/)) {
                  redirect = redirect.substr(redirect.indexOf('#') + 1);
                }
              } else {
                window.location.href = redirect;
                return;
              }
            }
            setAuthority(response[0].authorities);
            props.history.push(redirect || routerBase);
            setSubmitting(false);
          }
        })
    }
  };

  const changeAutoLogin = e => {
    setAutoLogin(e.target.checked)
  };

  return (
    <div className={styles.main}>
      <LoginComponents
        defaultActiveKey={type}
        onTabChange={onTabChange}
        onSubmit={handleSubmit}
        ref={form => {
          setLoginForm(form);
        }}
      >
        <Tab
          key="JSON"
          tab={formatMessage({
            id: 'userandlogin.login.tab-login-credentials',
          })}
        >
          <UserName
            name="username"
            placeholder={`${formatMessage({
              id: 'userandlogin.login.userName',
            })}`}
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'userandlogin.userName.required',
                }),
              },
            ]}
          />
          <Password
            name="password"
            placeholder={`${formatMessage({
              id: 'userandlogin.login.password',
            })}`}
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'userandlogin.password.required',
                }),
              },
            ]}
            onPressEnter={e => {
              e.preventDefault();
              if (loginForm) {
                loginForm.validateFields(handleSubmit);
              }
            }}
          />
        </Tab>
        <div>
          <Checkbox checked={autoLogin} onChange={changeAutoLogin}>
            <FormattedMessage id="userandlogin.login.remember-me"/>
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
            href=""
          >
            <FormattedMessage id="userandlogin.login.forgot-password"/>
          </a>
        </div>
        <Submit loading={submitting}>
          <FormattedMessage id="userandlogin.login.login"/>
        </Submit>
      </LoginComponents>
    </div>
  );
};


export default Login;
