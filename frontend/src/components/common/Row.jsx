import { Space, Divider } from "antd";
import React from "react";
import styled from "styled-components";

const PaddingRow = styled(Space) `
  padding: 8px;
  width: 100%;
`

const CustomRow = ({children}) =>{
  return (
    <div >
    <PaddingRow>
      {children}
    </PaddingRow>
    <Divider style={{margin: 12}}/>
    </div>
  )
}

export default CustomRow