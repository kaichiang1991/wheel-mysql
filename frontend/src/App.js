import 'antd/dist/antd.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import AddItem from './components/AddItem'
import ItemList from './components/ItemList'
import DefaultLayout from './components/layouts/DefaultLayout'
import CustomRow from './components/common/Row'
import LoadButton from './components/LoadButton'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentListState, prizeLists } from './recoil'
import { Button, Col, Row } from 'antd'

const App = () => {

  const currentList = useRecoilValue(currentListState)
  const [lists, setLists] = useRecoilState(prizeLists)
  const handleClick = async () => {
    console.log('開始抽獎', lists)
    const allPromise = lists.map(list => axios.patch(`/api/prize/${currentList}`, {...list, origCount: list.count}))
    await Promise.all(allPromise)
    alert('更新完畢')
  }

  return (
    <DefaultLayout >
      <LoadButton />
      <AddItem />
      <ItemList />
      <Row>
        <Col offset={20} span={4}><Button onClick={handleClick}>開始抽獎</Button></Col>
      </Row>
    </DefaultLayout>
  )
}

export default App