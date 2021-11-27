import { Container, Graphics, Stage } from '@inlet/react-pixi'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentListState, prizeLists, toPlayWheel } from '../../recoil'
import Wheel from './Wheel'
import Arrow from './Arrow'
import { arrowOffset, leastSpinDuration, radius, revertAngle, wheelDuration } from './gameConfig'
import gsap, { Power0 } from 'gsap'
import PixiPlugin from 'gsap/PixiPlugin'
import { useHistory } from 'react-router'
import axios from 'axios'
gsap.registerPlugin(PixiPlugin)
gsap.defaults({ease: Power0.easeNone})

const Square = ({position}) => {
  const draw = useCallback(g =>{
    g.beginFill(0xFF0000).drawRect(0, 0, 100, 100).endFill()
  }, [])
  return <Graphics position={position || [0, 0]} draw={draw}/>
}

const AppGame = ({parentWidth}) => {
  const [app, setApp] = useState()

  const currentList = useRecoilValue(currentListState)
  const history = useHistory()
  // 重整後回覆上一頁
  useEffect(()=> !currentList && history.push('/'), [currentList, history])

  // 設定畫布大小
  useEffect(() => {
    if(!app)
      return

    app.view.style.width = parentWidth + 'px'
    app.view.style.height = parentWidth + 'px'
  }, [parentWidth, app])

  const [lists, setLists] = useRecoilState(prizeLists)
  const [toPlay, setToPlay] = useRecoilState(toPlayWheel)
  const wheelRef = useRef()

  // 遊戲開關
  useEffect(()=>{
    if(!toPlay)
      return

    const wheel = wheelRef.current

    /**
     * 取得結果角度
     * @param {string} name 結果名字
     * @returns {number} 360 + 角度
     */
    const getResultAngle = (name) => {
      const totalCount = lists.reduce((pre, curr) => pre + curr.origCount, 0)
      const index = lists.findIndex(list => list.name === name)
      if(index < 0)
        alert('找不到結果')

      const bottomAngle = lists.slice(0, index).reduce((pre, curr) => pre + 360 * (curr.origCount / totalCount), 0)
      const topAngle = lists.slice(0, index + 1).reduce((pre, curr) => pre + 360 * (curr.origCount / totalCount), 0)
      
      return 360 + gsap.utils.random(bottomAngle, topAngle)
    }

    const spinStop = async ({name}) => {
      console.log('spin stop', name)
      wheel.angle %= 360
      const angle = getResultAngle(name)
      // 先轉到原點
      gsap.timeline()
      .to(wheel, {duration: wheelDuration * (360 - wheel.angle) / 360, pixi: {angle: 360}})
      .to(wheel, {duration: wheelDuration * angle / 360, pixi: {angle}})
      .eventCallback('onComplete', async ()=>{
        wheel.angle %= 360
        const r = await axios.post(`/api/result/${currentList}`, {name})
        const newList = lists.map(list => list.name === r.data.name? r.data: list)
        setLists(newList)
        setToPlay(false)
      })
    }

    // 開始轉動
    const startSpin = async () =>{
      const spinConfig = {duration: wheelDuration, repeat: -1, pixi: {angle: '+=360'}, onComplete: ()=> spinStop(result)}
      const timeline = gsap.timeline()
      .to(wheel, {duration: .3, pixi: {angle: `-=${revertAngle}`}})
      .to(wheel, spinConfig)

      const result = (await axios.get(`/api/result/${currentList}`)).data
      if(result.code < 0){         // 防呆
        alert('沒有獎項')
        return
      }

      gsap.delayedCall(leastSpinDuration, ()=>{
        // eslint-disable-next-line 
        const [_, repeatTween] = timeline.getChildren()
        const times = Math.floor(repeatTween.totalTime() / repeatTween.duration())
        repeatTween.repeat(times)
      })
    }

    startSpin()
    
  }, [toPlay, setToPlay, lists, setLists, currentList])

  return (
    <Stage width={720} height={720} onMount={e => setApp(e)} options={{
      width: 720, height: 720, resolution: 1, transparent: true
    }}>
      <Square />
      <Square position={[620, 620]}/>
      <Container position={[300, 300]}>
        <Wheel refCb={wheelRef} lists={lists}/>
        <Arrow pos={[radius + arrowOffset, 0]}/>
      </Container>
    </Stage>
  )
}

export default AppGame
