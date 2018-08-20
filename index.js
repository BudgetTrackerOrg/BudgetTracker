import React from 'react'
import { AppRegistry } from 'react-native'
import App from './src/App'
import { Provider } from 'react-redux'
import { configureStore, persistor } from './src/store'
import { PersistGate } from 'redux-persist/lib/integration/react'

const store = configureStore()

const rootApp = () => (
    <Provider store={store}>
        <PersistGate loading={<App />} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
)

AppRegistry.registerComponent('BudgetTracker', () => rootApp)
