import styled from "styled-components"
import { Layout, Row, Col } from 'antd'
import TitleSelector from "../TitleSelector"
import { useEffect, useState } from "react"
import axios from "axios"

const StyledHeader = styled(Layout.Header)`

  .ant-row{
    align-items: center;
  }  

  .ant-col > span{
    color: #fff;
    font-size: 20px;
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

  return (
    <StyledHeader>
      <Row>
        <Col span={12}><span>抽獎名稱</span></Col>
        <Col span={12}><TitleSelector arr={selectArr} reloadState={reloadState}/></Col>
      </Row>
    </StyledHeader>
  )
}

export default AppHeader