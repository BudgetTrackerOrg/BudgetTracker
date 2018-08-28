// Use variables to avoid future errors resulting from typos in Strings
const ADD_TRANSACTION = 'ADD_TRANSACTION'

export { ADD_TRANSACTION }

// The second argument is an empty Object because
// the data is already being passed in the form of 'transaction'.
// the third and fourth arugments are optional
export default (transaction, {}, uid = null, displayName = null) => {
    // 0.00001 is used to bring two figures across the decimal point.
    // The multiplication, rounding, and division removes excess decimal places after.
    // Math.floor is used because it is likely that any additional decimal places
    // were entered by accident, and rounding upwards would never be the intent
    transaction.amount = Math.floor((transaction.amount + 0.00001) * 100) / 100
    if (uid && displayName) {
        transaction.uid = uid
        transaction.displayName = displayName
    }

    return {
        type: ADD_TRANSACTION,
        payload: transaction
    }
}
