import { Button } from "antd"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import { currentListState, prizeLists } from "../recoil"
import AddItem from "./AddItem"
import ItemList from "./ItemList"
import LoadButton from "./LoadButton"

const SettingPage = () => {
  const currentList = useRecoilValue(currentListState)
  const [lists, setLists] = useRecoilState(prizeLists)
  const [toNext, setToNext] = useState(false)
  const history = useHistory()
  
  useEffect(()=>{
    if(!toNext)
      return
    
    history.push('/game')
  }, [lists, toNext, history])


  const handleClick = async () => {
    const allPromise = lists.map(list => axios.patch(`/api/prize/${currentList}`, {...list, origCount: list.count}))
    const result = (await Promise.all(allPromise)).map(r => r.data.prize)
    setLists(result)
    setToNext(true)
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
