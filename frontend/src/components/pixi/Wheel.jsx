import { Graphics } from "@inlet/react-pixi";
import { Text } from "pixi.js-legacy";
import { useCallback } from "react";
import {colorArr, deg2Rad, getCirclePosWithRadius, getColorIndex, radius, textStyle} from './gameConfig'

const Wheel = ({lists}) => {
  
  const draw = useCallback(g =>{
    console.log('callback', lists)
    const totalCount = lists.reduce((pre, curr) => pre + curr.origCount, 0),
    listCount = lists.length
    let currentDeg = 0
    g.clear()
    lists.map((list, index) =>{
      const {origCount} = list
      const nextDegree = currentDeg - (origCount / totalCount) * 360

      g.moveTo(0, 0)
      .lineStyle(2, 0)
      .beginFill(colorArr[getColorIndex(index, listCount)])
      .arc(0, 0, radius, deg2Rad(currentDeg), deg2Rad(nextDegree), true)

      // 上面的文字
      const text = g.addChild(new Text(list.name, textStyle))
      const angle = (currentDeg + nextDegree) / 2
      const [textX, textY] = getCirclePosWithRadius(angle).map(num => num * .6)
      text.angle = angle
      text.position.set(textX, textY)
      text.anchor.set(.5)
          
      currentDeg = nextDegree
      return null
    })
    g.endFill()
  }, [lists])

  return <Graphics draw={draw}/>
}

export default Wheel