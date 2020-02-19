import { createStackNavigator } from 'react-navigation'

import Main from './pages/main'
import Game from './pages/game'
import Levels from './pages/levels'

export default createStackNavigator({
  Main,
  Levels,
  Game
}, {
  navigationOptions: {
    header: null
  }
})
