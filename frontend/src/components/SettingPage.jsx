import { Button, Col, Row } from "antd"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { currentListState, prizeLists } from "../recoil"
import AddItem from "./AddItem"
import ItemList from "./ItemList"
import LoadButton from "./LoadButton"

const SettingPage = () => {
  const currentList = useRecoilValue(currentListState)
  const lists = useRecoilValue(prizeLists)
  const history = useHistory()
  const handleClick = async () => {
    const allPromise = lists.map(list => axios.patch(`/api/prize/${currentList}`, {...list, origCount: list.count}))
    await Promise.all(allPromise)
    console.log('更新完畢', history)
    history.push('/game')
  }

  return (
    <>
      <LoadButton />
      <AddItem />
      <ItemList />
      <Row>
        <Col offset={20} span={4}><Button onClick={handleClick}>開始抽獎</Button></Col>
      </Row>
    </>
  )
}

export default SettingPage
