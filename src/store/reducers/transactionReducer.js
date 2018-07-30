// All action "types" can be imported from the root of the "actions" directory
// Future action types can also be imported from here
import { ADD_TRANSACTION } from '../actions'

export default (state = initialState(), action) => {
    switch (action.actionType) {
        case ADD_TRANSACTION:
            return addTransaction()
            break
        default:
            return state
    }
}

const addTransaction = state => {
    // update state following returned object accordingly
    return {
        ...state
    }
}

const initialState = () => {
    return {
        expenses: [],
        income: []
    }
}
