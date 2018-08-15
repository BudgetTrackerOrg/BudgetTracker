// Use variables to avoid future errors resulting from typos in Strings
const ADD_TRANSACTION = 'ADD_TRANSACTION'

export { ADD_TRANSACTION }

export default transaction => {
    transaction.amount = Math.round(transaction.amount * 100) / 100 //round to 2 decimal places
    return {
        type: ADD_TRANSACTION,
        payload: transaction
    }
}
