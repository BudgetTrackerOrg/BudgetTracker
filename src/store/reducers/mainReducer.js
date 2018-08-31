import {
    FIRST_TIME_OPEN_ACTION,
    SET_USER_INFO,
    FETCH_TRANSACTIONS
} from '../actions'

export default (state = initialState(), action) => {
    switch (action.type) {
        case FIRST_TIME_OPEN_ACTION:
            return { ...state, isFirstTimeOpened: false }
        case SET_USER_INFO:
            return { ...state, userInfo: action.payload }
        case FETCH_TRANSACTIONS:
            // The 'fetchTransactions' action is what fetches all of the user's
            // transaction data from the Firebase, once they have logged in.
            if (action.payload.data) {
                // This condition must be checked, as onAuthStateChanged inside
                // Connections/index has a default behaviour of being called
                // initially, multiple times, no matter what
                // This prevents it from returning undefined and throwing an error
                return action.payload.data
            } else {
                return state
            }
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
        isFirstTimeOpened: true
    }
}
