import {Row, Col, List} from 'antd'
import { useRecoilValue } from 'recoil'
import {prizeLists} from '../recoil'
import styled from 'styled-components'

const StyledListContainer = styled(List)`

  height: 100%;

  .ant-row{
    width: 100%;
  }
`

const GameList = () => {
  const data = useRecoilValue(prizeLists)
  // ToDo 品項要有 ellipse
  return (
    <StyledListContainer
      dataSource={data}
      bordered={true}
      renderItem={({name, count}) =>(
        <List.Item>
          <Row>
            <Col span={12}><strong>{name}</strong></Col>
            <Col offset={4} span={8} >{count}</Col>
          </Row>
        </List.Item>
      )}
    />
  )
}

export default GameList
