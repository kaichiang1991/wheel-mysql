
import { Layout} from 'antd'
import AppHeader from './AppHeader'
const {Content} = Layout

const mainStyle = {
  height: '100%'
}

const DefaultLayout = ({title, children}) => {
  return (
    <Layout >
      <AppHeader />
      <Content style={mainStyle}>
        {children}
      </Content>
    </Layout>
  )
}

export default DefaultLayout
