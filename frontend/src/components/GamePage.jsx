import {Row, Col, Button} from 'antd'
import { useEffect, useRef, useState } from 'react'
import GameList from './GameList'
import AppGame from './pixi/AppGame'
import { PlayCircleFilled } from "@ant-design/icons"
import { useRecoilState, useRecoilValue } from 'recoil'
import { prizeLists, toPlayWheel } from '../recoil'

const GamePage = () => {

  const containerRef = useRef()
  const [disabled, setDisabled] = useState(false)
  const [toPlay, setToPlay] = useRecoilState(toPlayWheel)
  const lists = useRecoilValue(prizeLists)

  const [width, setWidth] = useState(0)
  useEffect(()=>{
    const resizeFn = ()=>{
      const {clientWidth} = containerRef.current
      setWidth(clientWidth)
    }
    window.addEventListener('resize', resizeFn)
    resizeFn()

    return ()=>{
      window.removeEventListener('resize', resizeFn)
    }
  }, [])

  useEffect(()=>{
    const remainCount = lists.reduce((pre, curr) => pre + curr.count, 0)
    const flag = remainCount <= 0? true: toPlay
    setDisabled(flag)
  }, [toPlay, lists])

  return (
    <>
      <Row style={{marginTop: 40}}>
        <Col ref={containerRef} span={14} >
          <AppGame parentWidth={width}/>
        </Col>
        <Col span={10}>
          <GameList />
        </Col>
      </Row>
      <Row style={{marginTop: 40}}>
        <Col span={24} style={{textAlign: 'center'}}>
          <Button disabled={disabled} size="large" type="primary" shape="round" icon={<PlayCircleFilled />} onClick={()=> setToPlay(true)} >抽獎</Button>
        </Col>
      </Row>
    </>
  )
}

export default GamePage
