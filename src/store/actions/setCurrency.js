// Use variables to avoid future errors resulting from typos in Strings
const SET_CURRENCY = 'SET_CURRENCY'

export { SET_CURRENCY }

export default selectedCurrency => {
    return { type: SET_CURRENCY, payload: selectedCurrency }
}
