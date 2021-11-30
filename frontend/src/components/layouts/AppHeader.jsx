import styled from "styled-components"
import { Layout, Row, Col } from 'antd'
import TitleSelector from "../TitleSelector"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import { currentListState } from "../../recoil"
import fetchData from "../../server"

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
  const [toReload, setToReload] = useState(true)
  const setCurrentList = useSetRecoilState(currentListState)
  
  // 重新取得所有 list
  useEffect(()=>{
    (async ()=>{
      const data = await fetchData('/api/list')
      setSelectArr(data)
    })()
  }, [toReload, setCurrentList])

  const history = useHistory()
  const handleClick = () => {
    history.push('/')
  }

  return (
    <StyledHeader>
      <Row>
        <Col span={12}><span onClick={handleClick}>抽獎名稱</span></Col>
        <Col span={12}><TitleSelector arr={selectArr} toReload={toReload} setToReload={setToReload} /></Col>
      </Row>
    </StyledHeader>
  )
}

export default AppHeader