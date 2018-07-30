export default (state = initialState(), action) => {
    switch (action.actionType) {
        case 'ADD_TRANSACTION':
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
