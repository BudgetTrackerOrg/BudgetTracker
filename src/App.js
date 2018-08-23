import React from 'react'
import { HomeScreen, CategoryScreen, OnboardingScreen } from './screens'

import { createStackNavigator } from 'react-navigation'

const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        Category: CategoryScreen,
        Onboarding: OnboardingScreen
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
