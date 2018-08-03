import React from 'react'
import { HomeScreen } from './screens'
import { CategoryScreen } from './screens'

import { createStackNavigator } from 'react-navigation'

const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        Category: CategoryScreen
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none'
    }
)

class App extends React.Component {
    render() {
        return <RootStack />
    }
}

export default App
