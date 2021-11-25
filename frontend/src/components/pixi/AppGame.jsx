import { Container, Graphics, Stage } from '@inlet/react-pixi'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { prizeLists, toPlayWheel } from '../../recoil'
import Wheel from './Wheel'
import Arrow from './Arrow'
import { arrowOffset, radius } from './gameConfig'

const Square = ({position}) => {
  const draw = useCallback(g =>{
    g.beginFill(0xFF0000).drawRect(0, 0, 100, 100).endFill()
  }, [])
  return <Graphics position={position || [0, 0]} draw={draw}/>
}

const AppGame = ({parentWidth}) => {
  const [app, setApp] = useState()

  // 設定畫布大小
  useEffect(() => {
    if(!app)
      return

    app.view.style.width = parentWidth + 'px'
    app.view.style.height = parentWidth + 'px'
  }, [parentWidth, app])

  const [lists] = useRecoilState(prizeLists)
  const [toPlay, setToPlay] = useRecoilState(toPlayWheel)

  // 遊戲開關
  useEffect(()=>{
    if(!toPlay)
      return

    // 開始轉動

    // 轉動結束 ToDo
    setTimeout(() => {
      setToPlay(false)
    }, 3000)
    
  }, [toPlay, setToPlay])

  return (
    <Stage width={720} height={720} onMount={e => setApp(e)} options={{
      width: 720, height: 720, resolution: 1, transparent: true
    }}>
      <Square />
      <Square position={[620, 620]}/>
      <Container position={[300, 300]}>
        <Wheel lists={lists}/>
        <Arrow pos={[radius + arrowOffset, 0]}/>
      </Container>
    </Stage>
  )
}

export default AppGame
