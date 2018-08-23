import { FIRST_TIME_OPEN_ACTION } from '../actions'

export default (state = initialState(), action) => {
    switch (action.type) {
        case FIRST_TIME_OPEN_ACTION:
            return { ...state, isFirstTimeOpened: false }
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
