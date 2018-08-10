// All action "types" can be imported from the root of the "actions" directory
// Future action types can also be imported from here
import { ADD_TRANSACTION } from '../actions'

export default (state = demoState(), action) => {
    switch (action.type) {
        case ADD_TRANSACTION:
            return addTransaction(state, action.payload)
            break
        default:
            return state
    }
}

const addTransaction = (state, transaction) => {
    // update state following returned object accordingly
    if (transaction != undefined) {
        transaction['id'] = state.expenses.length
    }

    return { ...state, expenses: [...state.expenses, transaction] }
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
                dateAdded: new Date(),
                category: 'TRANSPORTATION'
            },
            {
                id: 1,
                title: 'gas #2',
                amount: 50,
                dateAdded: new Date('July 20, 69 00:20:18'),
                category: 'TRANSPORTATION'
            },
            {
                id: 2,
                title: 'movie #1',
                amount: 20,
                dateAdded: new Date('July 20, 69 00:20:18'),
                category: 'ENTERTAINMENT'
            },
            {
                id: 3,
                title: 'cookie #1',
                amount: 34,
                dateAdded: new Date('July 20, 69 00:20:18'),
                category: 'FOOD'
            },
            {
                id: 4,
                title: 'house #1',
                amount: 1400,
                dateAdded: new Date('July 20, 69 00:20:18'),
                category: 'HOUSING'
            },
            {
                id: 5,
                title: 'water #1',
                amount: 140,
                dateAdded: new Date('July 20, 69 00:20:18'),
                category: 'BILLS'
            }
        ],
        income: []
    }
}
