import { Space, Divider } from "antd";
import styled from "styled-components";

const PaddingRow = styled.div `
  padding: 8px;
  width: 100%;

  .ant-space, .ant-space-item {
    width: 100%;
  }
`

const Row = ({children}) =>{
  return (
    <PaddingRow>
      <Space>
        {children}
      </Space>
      <Divider style={{margin: 12}}/>
    </PaddingRow>
  )
}

export default Row