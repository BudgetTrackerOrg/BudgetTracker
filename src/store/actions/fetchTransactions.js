// Use variables to avoid future errors resulting from typos in Strings
const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS'

export { FETCH_TRANSACTIONS }

export default input => {
    let { income, expenses } = input.transactions || []

    return {
        type: FETCH_TRANSACTIONS,
        payload: { income, expenses }
    }
}
