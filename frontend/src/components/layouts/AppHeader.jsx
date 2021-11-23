import styled from "styled-components"
import { Layout, Row, Col } from 'antd'
import TitleSelector from "../TitleSelector"
import { useEffect, useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"

const StyledHeader = styled(Layout.Header)`

  .ant-row{
    align-items: center;
  }  

  .ant-col > span{
    color: #fff;
    font-size: 20px;
  }

  span{
    cursor: pointer;
  }
`

const AppHeader = () => {
  const [selectArr, setSelectArr] = useState([])
  const reloadState = useState(true)
  
  // 重新取得所有 list
  useEffect(async ()=>{
    const r = await axios.get('/api/list')
    setSelectArr(r.data)
  }, [reloadState[0]])

  const history = useHistory()
  const handleClick = () => {
    history.push('/')
  }

  return (
    <StyledHeader>
      <Row>
        <Col span={12}><span onClick={handleClick}>抽獎名稱</span></Col>
        <Col span={12}><TitleSelector arr={selectArr} reloadState={reloadState}/></Col>
      </Row>
    </StyledHeader>
  )
}

export default AppHeader