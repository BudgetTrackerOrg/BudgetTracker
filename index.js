import React from 'react'
import { AppRegistry } from 'react-native'
import App from './src/App'
import { Provider } from 'react-redux'
import { configureStore } from './src/store'

const store = configureStore()

const rootApp = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent('BudgetTracker', () => rootApp)
