import { Graphics } from "@inlet/react-pixi";
import { useCallback} from 'react'

const Arrow = ({pos, refCb}) => {
  const draw = useCallback(g => {
    g.beginFill(0xDD0000)
    .lineTo(0, -15)
    .lineTo(-30, 0)
    .lineTo(0, 15)
    .endFill()
  }, [])
  return <Graphics ref={refCb} draw={draw} position={pos} />
}

export default Arrow