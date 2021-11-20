import { Select, Divider, Input, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Row from '../components/common/Row'
import styled from 'styled-components'
import { useState } from 'react';
import axios from 'axios';

const { Option } = Select;

const StyledInputContainer = styled.div `
  display: flex;
  align-items: center;
  color: #1890ff;

  input, span{
    margin: 4px;
  }
`

const TitleSelector = ({arr, reloadState}) => {

  const [item, setItem] = useState('')
  
  const handleNameChange = ({target: {value}}) => {
    setItem(value)
  }

  const addItem = async () => {
    await axios.post('/api/list', {title: item})
    const [toReload, setToReload] = reloadState
    setToReload(!toReload)
  }

  return (
    <Row>
      <span>抽獎名稱</span>
      <Select onSelect={()=> console.log('select')} size='large' placeholder='請選擇抽獎名稱' dropdownStyle={{width: '100%'}} dropdownRender={menu => (
        <div>
          {menu}
          <Divider style={{margin: '4px 0'}}/>
          <StyledInputContainer>
            <Input onChange={handleNameChange} value={item}/>
            <PlusOutlined onClick={addItem}/>
          </StyledInputContainer>
        </div>
      )}>
        {arr.map(({id, title}) => <Option key={id}>{title}</Option> )}
      </Select>
    </Row>
  )
}

export default TitleSelector
