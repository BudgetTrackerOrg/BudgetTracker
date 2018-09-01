// Use variables to avoid future errors resulting from typos in Strings
const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS'

export { FETCH_TRANSACTIONS }

export default transactions => {
    return {
        type: FETCH_TRANSACTIONS,
        payload: transactions
    }
}
