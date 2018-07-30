import { combineReducers, createStore } from 'redux'
import { mainReducer } from './reducers'
import { transactionReducer } from './reducers'

const rootReducer = combineReducers({
    main: mainReducer,
    // Must be the name of the action (addTransaction) in order to reference the state properly
    addTransaction: transactionReducer
})

const configureStore = () => {
    return createStore(rootReducer)
}

export { configureStore }
