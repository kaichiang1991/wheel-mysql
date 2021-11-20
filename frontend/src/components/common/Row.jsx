import { Space, Divider } from "antd";
import styled from "styled-components";

const PaddingRow = styled.div `
  padding: 8px;
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