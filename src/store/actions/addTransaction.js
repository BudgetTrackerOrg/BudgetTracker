// Use variables to avoid future errors resulting from typos in Strings
const ADD_TRANSACTION = 'ADD_TRANSACTION'

export { ADD_TRANSACTION }

export default transaction => {
    // 0.00001 is used to bring two figures across the decimal point.
    // The multiplication, rounding, and division removes excess decimal places after.
    // Math.floor is used because it is likely that any additional decimal places
    // were entered by accident, and rounding upwards would never be the intent
    transaction.amount = Math.floor((transaction.amount + 0.00001) * 100) / 100

    return {
        type: ADD_TRANSACTION,
        payload: transaction
    }
}
