import {Row, Col} from 'antd'
import { useEffect, useRef, useState } from 'react'
import GameList from './GameList'
import AppGame from './pixi/AppGame'

const GamePage = () => {

  const containerRef = useRef()

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
    </>
  )
}

export default GamePage
