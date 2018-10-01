import { FIRST_TIME_OPEN_ACTION, SET_USER_INFO, SET_CURRENCY } from '../actions'
import { currencies } from '../../globals'
import Connections from '../../Connections'

export default (state = initialState(), action) => {
    switch (action.type) {
        case FIRST_TIME_OPEN_ACTION:
            return { ...state, isFirstTimeOpened: false }
        case SET_USER_INFO:
            return { ...state, userInfo: action.payload }
        case SET_CURRENCY:
            let { selectedCurrency } = action.payload

            // making sure selectedCurrency is never null or undefined
            let data = {
                selectedCurrency: selectedCurrency
                    ? selectedCurrency
                    : state.selectedCurrency
            }

            //only backtup to firebase if this action was initated from a fetch call
            if (!action.payload.isFetch) {
                Connections.backupToFirebase.currency(data)
            }

            return { ...state, selectedCurrency: data.selectedCurrency }
        default:
            return state
    }
}

const initialState = () => {
    return {
        id:
            '_' +
            Math.random()
                .toString(36)
                .substr(2, 9),
        isFirstTimeOpened: true,
        selectedCurrency: currencies[0]
    }
}
