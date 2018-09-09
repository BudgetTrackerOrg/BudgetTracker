import { currencies } from '../../globals'

// Use variables to avoid future errors resulting from typos in Strings
const SET_CURRENCY = 'SET_CURRENCY'

export { SET_CURRENCY }

export default (data = { selectedCurrency: currencies[0] }) => {
    return {
        type: SET_CURRENCY,
        payload: {
            selectedCurrency: data.selectedCurrency,
            isFetch: data.isFetch
        }
    }
}
