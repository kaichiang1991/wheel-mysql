import { Col, Button, Upload, message} from 'antd'
import { UploadOutlined } from "@ant-design/icons"
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { currentListState, prizeLists } from '../recoil'
import fetchData from '../server'
import CustomRow from './common/Row'
// import XLSX from 'xlsx'

const LoadButton = () => {
  const props = {
    accept: ".xls, .xlsx",
    beforeUpload: ({type, name}) => {
      if(type !==  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
        message.error(`請上傳 excel 檔 "${name}"`)
      }
      return type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'? true: Upload.LIST_IGNORE
    },
    onChange: (e) => {
    }
  }

  const currentList = useRecoilValue(currentListState)
  const setLists = useSetRecoilState(prizeLists)

  /** 按讀取後的行為 */
  const handleLoadClick = async () => {
    if(!currentList)
      return
    const data = await fetchData(`/api/prize/${currentList}`)
    setLists(data)
  }

  return (
    <CustomRow>
      <Col span={10} offset={2}><Button onClick={handleLoadClick}>讀取</Button></Col>
      <Col span={12}>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>上傳表格</Button>
        </Upload>
      </Col>
    </CustomRow>
  )
}

export default LoadButton
