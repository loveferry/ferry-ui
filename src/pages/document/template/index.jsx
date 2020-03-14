import {DownloadOutlined, PlusOutlined, UploadOutlined} from '@ant-design/icons';
import {Button, Card, message, List, Typography, Upload} from 'antd';
import React, {Component} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect} from 'dva';
import styles from './style.less';

const {Paragraph} = Typography;

class Template extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'template/fetch',
      payload: {
        page: 1,
        pageSize: 8
      },
    });
  }

  download(templateId) {
    window.location.href = '/api/sys/attachment/download?sourceType=DOC_TEMPLATE&sourceKey='+templateId;
  }

  render() {
    const {
      template: {list},
      loading,
    } = this.props;
    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          文档模版定义，模版参数定义
        </p>
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
      <PageHeaderWrapper content={content} /*extraContent={extraContent}*/>
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
                        <Upload {
                                  ...{
                                    name: 'files',
                                    action: '/api/sys/attachment/upload',
                                    method: 'POST',
                                    multiple: false,   // 是否支持多选文件
                                    accept: '.doc,.docx',
                                    data: {
                                      sourceType: "DOC_TEMPLATE",
                                      sourceKey: item.templateId
                                    },
                                    onChange(info) {
                                      if (info.file.status === 'done') {
                                        if(info.file.response.success){
                                          message.success(`${info.file.name} 上传成功`);
                                        }else{
                                          message.error(`${info.file.name} ${info.file.response.message}`);
                                        }
                                      } else if (info.file.status === 'error') {
                                        message.error(`${info.file.name} 上传失败`);
                                      }
                                    },
                                  }
                                } showUploadList={false}>
                          <Button>
                            <UploadOutlined />
                            上传
                          </Button>
                        </Upload>,
                        // <a key="upload"><UploadOutlined />上传</a>,
                        <Button onClick={() => this.download(item.templateId)}>
                          <DownloadOutlined />
                          下载
                        </Button>
                      ]}
                    >
                      <Card.Meta
                        avatar={<img alt="" className={styles.cardAvatar} src={item.templateImage  || "http://47.100.232.59/u01/ferry/doc/404.jpg"}/>}
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
                  <Button type="dashed" className={styles.newButton}>
                    <PlusOutlined/> 新增产品
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

export default connect(({template, loading}) => ({
  template,
  loading: loading.models.template,
}))(Template);
