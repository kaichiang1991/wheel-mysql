import { Button } from "antd"
import React from "react"
import { useHistory } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import { currentListState, prizeLists } from "../recoil"
import fetchData from "../server"
import AddItem from "./AddItem"
import ItemList from "./ItemList"
import LoadButton from "./LoadButton"

const SettingPage = () => {
  const currentList = useRecoilValue(currentListState)
  const [lists, setLists] = useRecoilState(prizeLists)
  const history = useHistory()
  
  // 開始遊戲
  const handleClick = async () => {
    const arr = await fetchData('/api/prize/updateAll', 'PATCH', {list_name: currentList, lists: lists.map(list => ({...list, origCount: list.count}))})
    setLists(arr)
    history.push('/game')
  }

  return (
    <>
      <LoadButton />
      <AddItem />
      <ItemList />
      <Button style={{position: 'absolute', right: 20}} onClick={handleClick}>開始抽獎</Button>
    </>
  )
}

export default SettingPage
