import {PlusOutlined} from '@ant-design/icons';
import {Button, Card, List, Typography} from 'antd';
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
        count: 8,
      },
    });
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
              if (item && item.id) {
                return (
                  <List.Item key={item.id}>
                    <Card
                      hoverable
                      className={styles.card}
                      actions={[<a key="option1">操作一</a>, <a key="option2">操作二</a>]}
                    >
                      <Card.Meta
                        avatar={<img alt="" className={styles.cardAvatar} src={item.avatar}/>}
                        title={<a>{item.title}</a>}
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
