
import { Layout } from 'antd'
import { RecoilRoot } from 'recoil'
const {Header, Content} = Layout

const headerStyle = {
  color: '#fff'
}

const DefaultLayout = ({children}) => {
  return (
    <RecoilRoot>
      <Layout >
        <Header style={headerStyle}>
          抽獎程式
        </Header>
        <Content>
          {children}
        </Content>
      </Layout>
    </RecoilRoot>
  )
}

export default DefaultLayout
