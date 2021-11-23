import { Stage, useApp } from '@inlet/react-pixi'
import { useEffect, useState } from 'react'

const AppGame = ({parentWidth}) => {

  const [app, setApp] = useState()

  useEffect(() => {
    if(!app)
      return

    app.view.style.width = parentWidth + 'px'
    app.view.style.height = parentWidth + 'px'
  }, [parentWidth, app])

  return (
    <Stage width={720} height={720} onMount={e => setApp(e)} options={{
      width: 720, height: 720, resolution: 1
    }}>
      
    </Stage>
  )
}

export default AppGame
