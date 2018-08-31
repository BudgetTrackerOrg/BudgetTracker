// All action "types" can be imported from the root of the "actions" directory
// Future action types can also be imported from here
import {
    ADD_TRANSACTION,
    DELETE_TRANSACTION,
    EDIT_TRANSACTION
} from '../actions'

import Connections from '../../Connections'

export default (state = initialState(), action) => {
    let newState = null
    switch (action.type) {
        case ADD_TRANSACTION:
            newState = addTransaction(state, action.payload)
            Connections.backupToFirebase(newState)
            break
        case EDIT_TRANSACTION:
            newState = editTransaction(state, action.payload)
            Connections.backupToFirebase(newState)
            break
        case DELETE_TRANSACTION:
            newState = deleteTransaction(state, action.payload)
            Connections.backupToFirebase(newState)
            break
        default:
            newState = state
    }
    // NOTE
    // Connections.backupToFirebase() *cannot* be called from here
    // It will throw an error because the userInfo object is initially null.
    // This is because by default, onAuthStateChanged is called immediately
    return newState
}

const addTransaction = (state, transaction) => {
    // update state following returned object accordingly
    if (transaction !== undefined) {
        // This creates a ten-digit randomized number for the ID.
        // This is now being used rather than the length of the array because
        // the length will change if items are deleted, so it would cause
        // conflicting IDs and leave the user unable to add new items
        transaction['id'] = Math.floor(Math.random() * 10000000000)
    }

    return {
        ...state,
        expenses: [...state.expenses, transaction]
    }
}

const deleteTransaction = (state, id) => {
    expenses = state.expenses.slice() //copying by value, to avoid mutation

    for (let i = 0; i < expenses.length; ++i) {
        if (expenses[i].id === id) {
            expenses.splice(i, 1)
            return { ...state, expenses }
        }
    }

    return state
}

const editTransaction = (state, updatedTransaction) => {
    expenses = state.expenses.slice() //copying by value, to avoid mutation

    for (let i = 0; i < expenses.length; ++i) {
        if (expenses[i].id === updatedTransaction.id) {
            expenses[i] = updatedTransaction
            return { ...state, expenses }
        }
    }

    return state
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
