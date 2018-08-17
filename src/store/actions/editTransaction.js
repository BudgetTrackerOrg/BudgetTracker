// Use variables to avoid future errors resulting from typos in Strings
const EDIT_TRANSACTION = 'EDIT_TRANSACTION'

export { EDIT_TRANSACTION }

export default (updatedTransaction, id) => {
    updatedTransaction.id = id

    return { type: EDIT_TRANSACTION, payload: updatedTransaction }
}
