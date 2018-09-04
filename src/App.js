import React from 'react'
import { HomeScreen, CategoryScreen, OnboardingScreen } from './screens'

import { createStackNavigator } from 'react-navigation'

console.ignoredYellowBox = ['Setting a timer'] // no workaround is present for this just yet. https://github.com/facebook/react-native/issues/12981#issuecomment-302059217

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
