import CustomRow from '../components/common/Row'
import { Table } from 'antd'
import ItemButton from './ItemButton'
import { useRecoilValue } from 'recoil'
import { prizeListInFormData } from '../recoil'

const ItemList = () => {

  const lists = useRecoilValue(prizeListInFormData)

  const columns = [
    {
      title: '名稱',
      dataIndex: 'name',
      name: 'name',
      width: '40%',
      ellipsis: true
    },
    {
      title: '數量',
      dataIndex: 'count',
      name: 'count'
    },
    {
      title: '選項',
      dataIndex: 'option',
      name: 'option',
      render: (_, record)=> <ItemButton record={record} />
    }
  ]

  return (
    <CustomRow>
      <Table style={{width: '100%'}} columns={columns} dataSource={lists} pagination={false} />
    </CustomRow>
  )
}

export default ItemList
