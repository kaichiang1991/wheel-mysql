import { Form, Input, Button, InputNumber } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useRecoilState } from 'recoil';
import { prizeLists } from '../recoil';
import CustomRow from './common/Row'

const AddItem = () => {
      
  const [form] = useForm()
  const [lists, setLists] = useRecoilState(prizeLists)
  const onFinish = ({name, count}) =>{
    if(!name || !count)
      return

    if(lists.find(list => list.name === name)){
      alert('duplicate')      // ToDo 重複的錯誤提示

      return
    }
    
    setLists([...lists, {name, count}])
  }

  return (
    <CustomRow >
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
    </CustomRow>
  )
}

export default AddItem
