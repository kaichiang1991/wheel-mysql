import { Space, Divider } from "antd";
import React from "react";
import styled from "styled-components";

const PaddingRow = styled(Space) `
  padding: 8px;
  width: 100%;

  .ant-space-item{
    width: 100%;
  }
`

const CustomRow = ({children}) =>{
  return (
    <>
    <PaddingRow>
      {children}
    </PaddingRow>
    <Divider style={{margin: 12}}/>
    </>
  )
}

export default CustomRow