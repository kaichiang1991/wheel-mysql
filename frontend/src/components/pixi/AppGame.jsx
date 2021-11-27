import { Container, Stage } from '@inlet/react-pixi'
import { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentListState, prizeLists, toPlayWheel } from '../../recoil'
import Wheel from './Wheel'
import Arrow from './Arrow'
import ResultText from './ResultText'
import { arrowOffset, leastSpinDuration, radius, revertAngle, wheelDuration } from './gameConfig'
import gsap, { Power0, Power1, Elastic, Back } from 'gsap'
import PixiPlugin from 'gsap/PixiPlugin'
import { useHistory } from 'react-router'
import axios from 'axios'

gsap.registerPlugin(PixiPlugin)
gsap.defaults({ease: Power0.easeNone})
const boundEvent = 'boundEvent'
let boundIndex = -1

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
  const wheelRef = useRef(), arrowRef = useRef(), textRef = useRef()
  const [resultText, setResultText] = useState('')

  useEffect(()=>{    
    if(resultText)
      return

    const wheel = wheelRef.current, arrow = arrowRef.current

    // 箭頭抖動
    const arrowTimeline = gsap.timeline()
    .to(arrow, {duration: .2, ease: Power1.easeOut, angle: '-=15'})
    .to(arrow, {duration: .45, ease: Elastic.easeOut.config(1.75, .5), angle: '+=15'})
    .pause()

    const callback = index => {
      boundIndex = index
      arrowTimeline.isActive() && arrowTimeline.kill()
      arrowTimeline.totalProgress(0).play()
      setResultText(lists[boundIndex].name)
    }
    wheel.on(boundEvent, callback)

  }, [setResultText, lists])

  // 遊戲開關
  useEffect(()=>{
    if(!toPlay)
      return

    const wheel = wheelRef.current, text = textRef.current
    const playResultTextAnim = () => new Promise(res => {
      gsap.timeline()
      .to(text, {ease: Back.easeOut.config(2), pixi: {scale: 1.5}})
      .to(text, {ease: Back.easeOut.config(2), duration: .2, delay: .3, pixi: {scale: 2}})
      .add(res, '+=1')
    })

    /**
     * 設定目前指到的獎項 index
     * @param {*} angle 角度 degree
     */
    const calcCurrentIndex = (angle)=>{
      const totalCount = lists.reduce((pre, curr) => pre + curr.origCount, 0)
      const key = wheel.angle < 0? boundIndex: lists.findIndex((_, idx) => angle <= lists.slice(0, idx + 1).reduce((pre, curr) => pre + (curr.origCount / totalCount * 360), 0))

      if(key !== boundIndex && key > -1){
        wheel.emit(boundEvent, key)     // 通知換邊界了
      }
    }
        
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
      wheel.angle %= 360
      const angle = getResultAngle(name)
      // 先轉到原點
      gsap.timeline()
      .to(wheel, {duration: wheelDuration * (360 - wheel.angle) / 360, pixi: {angle: 360}})
      .to(wheel, {duration: wheelDuration * angle / 360, pixi: {angle}})
      .eventCallback('onUpdate', ()=> calcCurrentIndex((wheel.angle + 360)% 360))
      .eventCallback('onComplete', async ()=>{
        wheel.angle %= 360
        const r = await axios.post(`/api/result/${currentList}`, {name})
        const newList = lists.map(list => list.name === r.data.name? r.data: list)
        await playResultTextAnim()
        gsap.set(text, {pixi: {scale: 1}})
        setLists(newList)
        setToPlay(false)
      })
    }

    // 開始轉動
    const startSpin = async () =>{
      const spinConfig = {duration: wheelDuration, repeat: -1, pixi: {angle: '+=360'}
        , onUpdate: ()=> wheel.angle = (wheel.angle + 360)% 360
        , onComplete: ()=> {
          timeline.eventCallback('onUpdate', null)
          spinStop(result)
        }
      }

      // 初始化 boundIndex
      boundIndex = boundIndex === -1? lists.length - 1: boundIndex
      
      const timeline = gsap.timeline()
      .to(wheel, {duration: .3, pixi: {angle: `-=${revertAngle}`}})
      .to(wheel, spinConfig)
      .eventCallback('onUpdate', ()=> calcCurrentIndex(wheel.angle))

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
      <Container position={[0, 300]}>
        <Wheel refCb={wheelRef} lists={lists}/>
        <Arrow refCb={arrowRef} pos={[radius + arrowOffset, 0]}/>
        <ResultText refCb={textRef} text={resultText} pos={[radius + arrowOffset + 50, 0]}/>
      </Container>
    </Stage>
  )
}

export default AppGame
