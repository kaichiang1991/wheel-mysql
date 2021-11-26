import 'antd/dist/antd.css'
import DefaultLayout from './components/layouts/DefaultLayout'
import {Route, Switch} from 'react-router-dom'
import SettingPage from './components/SettingPage'
import GamePage from './components/GamePage'
import * as PIXI from 'pixi.js-legacy'
window.PIXI = PIXI

const App = () => {

  return (
    <DefaultLayout >
      <Switch>
        <Route exact path='/' component={SettingPage} />
        <Route path='/game' component={GamePage} />
      </Switch>
    </DefaultLayout>
  )
}

export default App