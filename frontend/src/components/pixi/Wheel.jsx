import { Graphics, PixiComponent } from "@inlet/react-pixi";
import { useCallback } from "react";
// import { Graphics } from "pixi.js-legacy";
import {colorArr, deg2Rad, getColorIndex, radius} from './gameConfig'

const Wheel = ({lists}) => {
  
  const draw = useCallback(g =>{
    console.log('callback')
    const totalCount = lists.reduce((pre, curr) => pre + curr.origCount, 0),
    listCount = lists.length
    let currentDeg = 0
    g.clear()
    lists.map((list, index) =>{
      const {origCount} = list
      const nextDegree = currentDeg - (origCount / totalCount) * 360

      g.moveTo(0, 0)
      .beginFill(colorArr[getColorIndex(index, listCount)])
      .arc(0, 0, radius, deg2Rad(currentDeg), deg2Rad(nextDegree))
      currentDeg = nextDegree
    })
    g.endFill()
  }, [lists])

  return <Graphics draw={draw}/>
}

export default Wheel