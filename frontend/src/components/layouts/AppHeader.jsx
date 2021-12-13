import styled from "styled-components"
import { Layout, Row, Col } from 'antd'
import TitleSelector from "../TitleSelector"
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
  const history = useHistory()
  const handleClick = () => {
    history.push('/')
  }

  return (
    <StyledHeader>
      <Row>
        <Col span={12}><span onClick={handleClick}>抽獎名稱</span></Col>
        <Col span={12}><TitleSelector /></Col>
      </Row>
    </StyledHeader>
  )
}

export default AppHeader