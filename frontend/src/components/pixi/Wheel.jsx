import { Graphics } from "@inlet/react-pixi";
import { Text } from "pixi.js-legacy";
import { useCallback } from "react";
import {colorArr, deg2Rad, getCirclePosWithRadius, getColorIndex, radius, textStyle} from './gameConfig'

const Wheel = ({lists, refCb}) => {

  const draw = useCallback(g =>{
    const totalCount = lists.reduce((pre, curr) => pre + curr.origCount, 0),
    listCount = lists.length,
    disableColor = 0xc1c1c1

    let currentDeg = 0

    g.clear()
    lists.map((list, index) =>{
      const {origCount} = list
      const nextDegree = currentDeg - (origCount / totalCount) * 360

      g.moveTo(0, 0)
      .lineStyle(2, 0xFFFFFF)
      .beginFill(list.count > 0? colorArr[getColorIndex(index, listCount)]: disableColor)
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

    g.beginFill(0xDDDDDD)
    .drawCircle(0, 0, radius * .2)
    .endFill()
  }, [lists])

  return <Graphics draw={draw} ref={refCb}/>
}

export default Wheel