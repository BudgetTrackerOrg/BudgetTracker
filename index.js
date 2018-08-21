import React from 'react'
import { AppRegistry } from 'react-native'
import App from './src/App'
import { Provider } from 'react-redux'
import { store, persistor } from './src/store'
import { PersistGate } from 'redux-persist/lib/integration/react'

const rootApp = () => (
    <Provider store={store}>
        {/* TODO: Create a loading screen before the redux state is retrieved from device */}
        <PersistGate loading={<App />} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
)

AppRegistry.registerComponent('BudgetTracker', () => rootApp)
