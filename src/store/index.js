import { combineReducers, createStore } from 'redux'
import { mainReducer } from './reducers'
import { transactionReducer } from './reducers'

const rootReducer = combineReducers({
    main: mainReducer,
    transaction: transactionReducer
})

const configureStore = () => {
    return createStore(rootReducer)
}

export { configureStore }
