import { combineReducers, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { mainReducer } from './reducers'
import { transactionReducer } from './reducers'

const rootReducer = combineReducers({
    main: mainReducer,
    transaction: transactionReducer
})

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
}

const pReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(pReducer)

const persistor = persistStore(store)

export { store, persistor }
