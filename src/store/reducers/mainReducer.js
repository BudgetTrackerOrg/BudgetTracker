import { FIRST_TIME_OPEN_ACTION, SET_USER_INFO, SET_CURRENCY } from '../actions'

export default (state = initialState(), action) => {
    switch (action.type) {
        case FIRST_TIME_OPEN_ACTION:
            return { ...state, isFirstTimeOpened: false }
        case SET_USER_INFO:
            return { ...state, userInfo: action.payload }
        case SET_CURRENCY:
            return { ...state, selectedCurrency: action.payload }
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
