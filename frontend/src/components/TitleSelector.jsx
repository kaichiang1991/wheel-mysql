import { Select, Divider, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { currentListState } from '../recoil';
import { useLocation } from 'react-router-dom';

const { Option } = Select;

const StyledSelect = styled(Select)`
  width: 80%;
`

const StyledInputContainer = styled.div `
  display: flex;
  align-items: center;
  color: #1890ff;

  input, span{
    margin: 4px;
  }
`

const TitleSelector = ({arr, reloadState}) => {

  const [currList, setCurrList] = useRecoilState(currentListState)
  
  const handleNameChange = ({target: {value}}) => {
    setCurrList(value)
  }

  const addItem = async () => {
    if(arr.find(obj => obj.title === currList)){
      alert('名稱重複')
      return
    }

    await axios.post('/api/list', {title: currList})
    const [toReload, setToReload] = reloadState
    setToReload(!toReload)
  }

  const {pathname} = useLocation()
  return (
    <StyledSelect disabled={pathname === '/game'} onSelect={(e)=> setCurrList(arr.find(obj => obj.id == e + '').title)} size='large' placeholder='請選擇抽獎名稱' dropdownStyle={{width: '100%'}} dropdownRender={menu => (
      <div>
        {menu}
        <Divider style={{margin: '4px 0'}}/>
        <StyledInputContainer>
          <Input onChange={handleNameChange} value={currList}/>
          <PlusOutlined onClick={addItem}/>
        </StyledInputContainer>
      </div>
    )}>
    {arr.map(({id, title}) => <Option key={id}>{title}</Option> )}
    </StyledSelect>
  )
}

export default TitleSelector
