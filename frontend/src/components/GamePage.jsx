import {Row, Col, Divider, Button} from 'antd'
import { useEffect, useRef, useState } from 'react'
import GameList from './GameList'
import AppGame from './pixi/AppGame'
import { PlayCircleFilled } from "@ant-design/icons"
import { useRecoilState } from 'recoil'
import { toPlayWheel } from '../recoil'

const GamePage = () => {

  const containerRef = useRef()
  const [disabled, setDisabled] = useState(false)
  const [toPlay, setToPlay] = useRecoilState(toPlayWheel)

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
    setDisabled(toPlay)
  }, [toPlay])

  return (
    <>
      <Row>
        <Col ref={containerRef} span={14} >
          <AppGame parentWidth={width}/>
        </Col>
        <Col span={10}>
          <GameList />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24} style={{textAlign: 'center'}}>
          <Button disabled={disabled} size="large" type="primary" shape="round" icon={<PlayCircleFilled />} onClick={()=> setToPlay(true)} >抽獎</Button>
        </Col>
      </Row>
    </>
  )
}

export default GamePage
