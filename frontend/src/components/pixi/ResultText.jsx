import { Text } from "@inlet/react-pixi"
import { resultTextStyle } from "./gameConfig"

const ResultText = ({text, pos, refCb}) => {
  
  return <Text ref={refCb} text={text} position={pos} anchor={[0, .5]} style={resultTextStyle}/>
}

export default ResultText