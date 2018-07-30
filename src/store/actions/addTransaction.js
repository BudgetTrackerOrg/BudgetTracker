// Use variables to avoid future errors resulting from typos in Strings
const ADD_TRANSACTION = 'ADD_TRANSACTION'

export { ADD_TRANSACTION }

export default (addTransaction = transaction => {
    alert(transaction)
    return {
        type: ADD_TRANSACTION,
        payload: transaction
    }
})
