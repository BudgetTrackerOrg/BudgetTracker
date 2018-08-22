import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from './src/store'
import App from './src/App'
import Loading from './src/components/Loading/Loading'

const rootApp = () => (
    <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
)

AppRegistry.registerComponent('BudgetTracker', () => rootApp)
