import {Breadcrumb, Button, Card, DatePicker, Form, Radio, Select, Tag, Space, Table} from "antd";
import {Link} from "react-router-dom";
import locale from "antd/es/time-picker/locale/zh_CN";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import img404 from '@/assets/error.png'
import {useChannel} from "@/hooks/useChannel";
import {useEffect, useState} from "react";
import {getArticleListAPI} from "@/apis/article";

const Article = () => {

  const {channelList} = useChannel()

  // 准备列数据
  const status = {
    1: <Tag color='warning'>待审核</Tag>,
    2: <Tag color='success'>审核通过</Tag>
  }
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt=""/>
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => status[data]
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type='primary' shape='circle' icon={<EditOutlined/>}/>
            <Button type='primary' danger shape='circle' icon={<DeleteOutlined/>}/>
          </Space>
        )
      }
    }
  ]

  // 准备表格body数据
  const data = [
    {
      id: '8218',
      comment_count: 0,
      cover: {
        images: [],
      },
      like_count: 0,
      pubdate: '2019-03-11 09:00:00',
      read_count: 2,
      status: 2,
      title: 'wkwebview离线化加载h5资源解决方案'
    }
  ]

  const [list, setList] = useState([])
  const [count, setCount] = useState(0)
  const [reqData, setReqData] = useState({
    status: '',
    channel_id: '',
    begin_pubdate: '',
    end_pubdate: '',
    page: 1,
    per_page: 4
  })

  useEffect(() => {
    async function getList() {
      const res = await getArticleListAPI(reqData)
      setList(res.data.results)
      setCount(res.data.total_count)
    }
    getList()
  }, [reqData]);

  const onFinish = (formValue) => {
    setReqData({
      ...reqData,
      status: formValue.status,
      channel_id: formValue.channel_id,
      begin_pubdate: formValue.date[0].format('YYYY-MM-DD'),
      end_pubdate: formValue.date[1].format('YYYY-MM-DD'),
    })
  }

  return (
    <div>
      <Card title={
        <Breadcrumb items={[
          {title: <Link to={'/'}>首页</Link>},
          {title: '文章列表'}
        ]}/>
      }
            style={{marginBottom: 20}}
      >
        <Form initialValues={{statue: ''}} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择文章频道" style={{width: 120}}>
              {channelList.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            <DatePicker.RangePicker locale={locale}></DatePicker.RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{marginLeft: 40}}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table rowKey='id' columns={columns} dataSource={list}/>
      </Card>
    </div>)
}

export default Article