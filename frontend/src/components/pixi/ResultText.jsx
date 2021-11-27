import { Text } from "@inlet/react-pixi"
import { resultTextStyle } from "./gameConfig"

const ResultText = ({text, pos}) => {
  
  return <Text text={text} position={pos} anchor={[0, .5]} style={resultTextStyle}/>
}

export default ResultText