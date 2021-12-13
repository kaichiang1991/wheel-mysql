import { Select, Divider, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import { useSetRecoilState } from 'recoil';
import { currentListState } from '../recoil';
import { useLocation } from 'react-router-dom';
import fetchData from '../server';
import { useEffect, useState } from 'react';

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

const TitleSelector = () => {

  const [optionArr, setOptionArr] = useState([])
  const [newList, setNewList] = useState('')
  const setCurrList = useSetRecoilState(currentListState)
  
  // 取得 db 所有 list
  useEffect(()=>{
    (async ()=>{
      const data = await fetchData('/api/list')
      setOptionArr(data)
    })()
  }, [setOptionArr])
  
  // 監看選擇選項後，並設定 currentList
  const handleSelectItem = (e) => setCurrList(optionArr.find(option => option.id === +e).title)

  // 監看input的內容
  const handleNameChange = ({target: {value}}) => setNewList(value)

  /**
   * 新增一個抽獎列表
   * 同時存進db裡
   */
  const addItem = async () => {
    if(optionArr.find(obj => obj.title === newList)){
      alert('名稱重複')
      return
    }

    const {data} = await fetchData('/api/list', 'POST', {title: newList})
    setOptionArr([...optionArr, data])
    setNewList('')        // 清空 input
  }

  const {pathname} = useLocation()

  return (
    <StyledSelect disabled={pathname === '/game'} size='large' placeholder='請選擇抽獎名稱' onSelect={handleSelectItem}  
      dropdownStyle={{width: '100%'}} dropdownRender={menu => (
      <div>
        {menu}
        <Divider style={{margin: '4px 0'}}/>
        <StyledInputContainer>
          <Input onChange={handleNameChange} value={newList} />
          <PlusOutlined onClick={addItem}/>
        </StyledInputContainer>
      </div>
    )}>
    {optionArr.map(({id, title}) => <Option key={id}>{title}</Option> )}
    </StyledSelect>
  )
}

export default TitleSelector
