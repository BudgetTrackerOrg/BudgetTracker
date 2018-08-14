// Use variables to avoid future errors resulting from typos in Strings
const DELETE_TRANSACTION = 'DELETE_TRANSACTION'

export { DELETE_TRANSACTION }

export default id => {
    return { type: DELETE_TRANSACTION, payload: id }
}
