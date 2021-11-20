import { Form, Input, Button, InputNumber } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useRecoilState } from 'recoil';
import { prizeList } from '../recoil';
import Row from './common/Row'

const AddItem = () => {
      
  const [form] = useForm()
  const [list, setList] = useRecoilState(prizeList)
  const onFinish = ({name, count}) =>{
    if(!name || !count)
      return

    setList([...list, {name, count}])
  }

  return (
    <Row>
      <Form 
        style={{alignItems: 'flex-end', justifyContent: 'space-between'}}
        form={form}
        layout="inline"
        size="small"
        onFinish={onFinish}
      >
        <Form.Item name="name" label="品項" >
          <Input placeholder="獎項名稱"></Input>
        </Form.Item>
        <Form.Item name="count" label="數量">
          <InputNumber placeholder="獎項數量"></InputNumber>
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit">送出</Button>
        </Form.Item>
      </Form>
    </Row>
  )
}

export default AddItem
