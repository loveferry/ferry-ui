import { DownloadOutlined, PlusOutlined, UploadOutlined, PicLeftOutlined } from '@ant-design/icons';
import { Button, Card, message, List, Typography, Upload, Input } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';
import { routerRedux } from 'dva/router';
import {formatMessage} from "umi-plugin-react/locale";
const { Paragraph } = Typography;
const templateDefinitionPage = '/document/template/definition';
const templateParamPage = '/document/template/param/';

class Template extends Component {
  componentDidMount() {
    this.search();
  }

  download(templateId) {
    window.location.href =
      '/api/sys/attachment/download?sourceType=DOC_TEMPLATE&sourceKey=' + templateId;
  }

  search(value){
    const { dispatch } = this.props;
    dispatch({
      type: 'template/query',
      payload: {
        condition: value,
        page: 1,
        pageSize: 8,
      },
    });
  }


  update(template) {
    const { dispatch } = this.props;
    dispatch(
      routerRedux.push({
        pathname: templateDefinitionPage,
        params: template,
      })
    );
  }

  add() {
    this.update();
  }

  params(templateCode){
    const { dispatch } = this.props;
    dispatch(
      routerRedux.push({
        pathname: templateParamPage+templateCode,
      })
    );
  }

  render() {
    const {
      template: { list },
      loading,
    } = this.props;
    const content = (
      <div className={styles.pageHeaderContent}>
        <Input.Search
          placeholder={formatMessage({
            id: 'documentTemplate.search.placeholder',
          })}
          onSearch={value => this.search(value)}
          style={{
            width: 200,
          }}
        />
      </div>
    );
    const extraContent = (
      <div className={styles.extraImg}>
        <img
          alt="这是一个标题"
          src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
        />
      </div>
    );
    const nullData = {};
    return (
      <PageHeaderWrapper
        content={content}
        /*extraContent={extraContent}*/
      >
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{
              gutter: 24,
              lg: 3,
              md: 2,
              sm: 1,
              xs: 1,
            }}
            dataSource={[nullData, ...list]}
            renderItem={item => {
              if (item && item.templateId) {
                return (
                  <List.Item key={item.templateId}>
                    <Card
                      hoverable
                      className={styles.card}
                      actions={[
                        <Upload
                          {...{
                            name: 'files',
                            action: '/api/sys/attachment/upload',
                            method: 'POST',
                            multiple: false,
                            // 是否支持多选文件
                            accept: '.docx',
                            data: {
                              sourceType: 'DOC_TEMPLATE',
                              sourceKey: item.templateId,
                            },

                            onChange(info) {
                              if (info.file.status === 'done') {
                                if (info.file.response.success) {
                                  message.success(`${info.file.name} 上传成功`);
                                } else {
                                  message.error(`${info.file.name} ${info.file.response.message}`);
                                }
                              } else if (info.file.status === 'error') {
                                message.error(`${info.file.name} 上传失败`);
                              }
                            },
                          }}
                          showUploadList={false}
                        >
                          <Button>
                            <UploadOutlined />
                            上传
                          </Button>
                        </Upload>, // <a key="upload"><UploadOutlined />上传</a>,
                        <Button onClick={() => this.download(item.templateId)}>
                          <DownloadOutlined />
                          下载
                        </Button>,
                        <Button onClick={() => this.params(item.templateCode)}>
                          <PicLeftOutlined />
                          参数
                        </Button>,
                      ]}
                    >
                      <Card.Meta
                        avatar={
                          <img
                            alt=""
                            className={styles.cardAvatar}
                            src={item.templateImage || 'http://47.100.232.59/u01/ferry/doc/404.jpg'}
                          />
                        }
                        onClick={() => this.update(item)}
                        title={<a>{item.templateName}</a>}
                        description={
                          <Paragraph
                            className={styles.item}
                            ellipsis={{
                              rows: 3,
                            }}
                          >
                            {item.description}
                          </Paragraph>
                        }
                      />
                    </Card>
                  </List.Item>
                );
              }

              return (
                <List.Item>
                  <Button type="dashed" className={styles.newButton} onClick={() => this.add()}>
                    <PlusOutlined /> 模版定义
                  </Button>
                </List.Item>
              );
            }}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ template, loading }) => ({
  template,
  loading: loading.models.template,
}))(Template);
