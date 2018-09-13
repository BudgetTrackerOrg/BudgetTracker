import _ from 'lodash'

// All action "types" can be imported from the root of the "actions" directory
// Future action types can also be imported from here
import {
    ADD_TRANSACTION,
    DELETE_TRANSACTION,
    EDIT_TRANSACTION,
    FETCH_TRANSACTIONS
} from '../actions'

import Connections from '../../Connections'

export default (state = initialState(), action) => {
    let newState = null
    switch (action.type) {
        case ADD_TRANSACTION:
            newState = addTransaction(state, action.payload)
            Connections.backupToFirebase.transactions(newState)
            break
        case EDIT_TRANSACTION:
            newState = editTransaction(state, action.payload)
            Connections.backupToFirebase.transactions(newState)
            break
        case DELETE_TRANSACTION:
            newState = deleteTransaction(state, action.payload)
            Connections.backupToFirebase.transactions(newState)
            break
        case FETCH_TRANSACTIONS:
            // The 'fetchTransactions' action is what fetches all of the user's
            // transaction data from the Firebase, once they have logged in.

            if (action.payload) {
                // This condition must be checked, as onAuthStateChanged inside
                // Connections/index has a default behaviour of being called
                // initially, multiple times, no matter what
                // This prevents it from returning undefined and throwing an error
                return {
                    ...state,
                    expenses: action.payload.expenses,
                    income: action.payload.income
                }
            } else {
                return state
            }
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

    let expenses = _.map({ ...state.expenses }) || []
    let income = _.map({ ...state.income }) || []

    if (transaction.transactionType === 'spending') {
        expenses.push(transaction)
    } else if (transaction.transactionType === 'income') {
        income.push(transaction)
    }

    return { ...state, expenses, income }
}

const deleteTransaction = (state, id) => {
    expenses = state.expenses.slice() //copying by value, to avoid mutation
    income = state.income.slice() //copying by value, to avoid mutation

    for (let i = 0; i < expenses.length; ++i) {
        if (expenses[i].id === id) {
            expenses.splice(i, 1)
            return { ...state, expenses }
        }
    }

    for (let i = 0; i < income.length; ++i) {
        if (income[i].id === id) {
            income.splice(i, 1)
            return { ...state, income }
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
