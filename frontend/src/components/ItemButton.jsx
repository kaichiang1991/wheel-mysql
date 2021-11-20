import styled from "styled-components"
import {Space, Button} from 'antd'
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { useRecoilState } from "recoil"
import { prizeLists } from "../recoil"

const StyledButtonContainer = styled.div `

  @media (max-width: 480px){
    button{
      padding: 4px 4px;
    }
  }
`


const ItemButton = ({record: {name, count}}) => {

  const [lists, setLists] = useRecoilState(prizeLists)
  // 加減個數
  const handleClick = (flag) => {
    return ()=>{
      if(!flag && count > 0){
        setLists(lists.map(list => list.name === name? {...list, count: count - 1}: list))
      }else if(flag){
        setLists(lists.map(list => list.name === name? {...list, count: count + 1}: list))
      }
    }
  }

  // 刪除
  const handleDelete = () => {
    setLists(lists.filter(list => list.name !== name))
  }

  return (
    <StyledButtonContainer>
      <Space>
        <Button onClick={handleClick(false)}><MinusOutlined /></Button>
        <Button onClick={handleClick(true)}><PlusOutlined /></Button>
        <Button onClick={handleDelete}><DeleteOutlined /></Button>
      </Space>
    </StyledButtonContainer>
  )
}

export default ItemButton
