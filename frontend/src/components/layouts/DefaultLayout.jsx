
import { Layout } from 'antd'
import { RecoilRoot } from 'recoil'
const {Header, Content} = Layout

const headerStyle = {
  color: '#fff'
}

const mainStyle = {
  height: '100%'
}

const DefaultLayout = ({children}) => {
  return (
    <RecoilRoot>
      <Layout >
        <Header style={headerStyle}>
          抽獎程式
        </Header>
        <Content style={mainStyle}>
          {children}
        </Content>
      </Layout>
    </RecoilRoot>
  )
}

export default DefaultLayout
