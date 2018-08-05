// All action "types" can be imported from the root of the "actions" directory
// Future action types can also be imported from here
import { ADD_TRANSACTION } from '../actions'

export default (state = demoState(), action) => {
    switch (action.actionType) {
        case ADD_TRANSACTION:
            return addTransaction(state)
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

const demoState = () => {
    return {
        expenses: [
            {
                id: 0,
                title: 'gas #1',
                amount: 50,
                dateAdded: new Date(2013, 2, 1, 0, 70),
                category: 'TRANSPORTATION'
            },
            {
                id: 1,
                title: 'gas #2',
                amount: 50,
                dateAdded: new Date(2013, 2, 1, 0, 70),
                category: 'TRANSPORTATION'
            },
            {
                id: 2,
                title: 'movie #1',
                amount: 20,
                dateAdded: new Date(2013, 2, 1, 0, 70),
                category: 'ENTERTAINMENT'
            }
        ],
        income: []
    }
}
