import { Graphics } from "@inlet/react-pixi";
import { useCallback} from 'react'

const Arrow = ({pos}) => {
  const draw =useCallback(g => {
    g.beginFill(0xDD0000)
    .lineTo(30, -15)
    .lineTo(30, 15)
    .lineTo(0, 0)
    .endFill()
  }, [])
  return <Graphics draw={draw} position={pos} />
}

export default Arrow