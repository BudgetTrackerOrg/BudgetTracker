// Use variables to avoid future errors resulting from typos in Strings
const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS'

export { FETCH_TRANSACTIONS }

export default input => {
    return {
        type: FETCH_TRANSACTIONS,
        payload: {
            income: input.transactions.income,
            expenses: input.transactions.expenses
        }
    }
}
