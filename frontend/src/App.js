import 'antd/dist/antd.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import AddItem from './components/AddItem'
import ItemList from './components/ItemList'
import DefaultLayout from './components/layouts/DefaultLayout'
import TitleSelector from './components/TitleSelector'

const App = () => {
  const [selectArr, setSelectArr] = useState([])
  const [toReload, setToReload] = useState(true)

  // 重新取得所有 list
  useEffect(async ()=>{
    const r = await axios.get('/api/list')
    setSelectArr(r.data)
  }, [toReload])

  return (
    <DefaultLayout>
      <TitleSelector arr={selectArr} reloadState={[toReload, setToReload]} />
      <AddItem />
      <ItemList />
    </DefaultLayout>
  )
}

export default App