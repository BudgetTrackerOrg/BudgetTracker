// All action "types" can be imported from the root of the "actions" directory
// Future action types can also be imported from here
import {
    ADD_TRANSACTION,
    DELETE_TRANSACTION,
    EDIT_TRANSACTION
} from '../actions'

import { backupToFirebase } from '../../Connections'

export default (state = initialState(), action) => {
    switch (action.type) {
        case ADD_TRANSACTION:
            return addTransaction(state, action.payload)
            break
        case DELETE_TRANSACTION:
            return deleteTransaction(state, action.payload)
            break
        case EDIT_TRANSACTION:
            return editTransaction(state, action.payload)
            break
        default:
            return state
    }
}

const addTransaction = (state, transaction, uid = null, displayName = null) => {
    // update state following returned object accordingly
    if (transaction != undefined) {
        transaction['id'] = state.expenses.length
    }
    if (uid && displayName) {
        backupToFirebase(uid, displayName)
    }
    console.log(backupToFirebase(uid, displayName))

    return {
        ...state,
        expenses: [...state.expenses, transaction],
        uid,
        displayName
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
