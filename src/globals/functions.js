import Entities from 'html-entities/lib/html5-entities'
// This allows the decoding of Entity characters for currency symbols
let entities = new Entities()

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

export default {
    toTitleCase(str) {
        if (str === undefined) return
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        })
    },

    toSimpleDateString(date) {
        if (date === undefined) return
        let str = MONTHS[date.getMonth()]
        str += ' ' + date.getDate()
        str += ', ' + date.getFullYear()
        return str
    },

    getExpenseResult(expenses) {
        let total = 0
        let categories = {}

        for (let i in expenses) {
            total += expenses[i].amount

            if (categories[expenses[i].category] === undefined)
                categories[expenses[i].category] = {}

            if (categories[expenses[i].category]['total'] != undefined) {
                categories[expenses[i].category]['total'] += expenses[i].amount
            } else {
                categories[expenses[i].category]['total'] = expenses[i].amount
            }
        }

        for (let i in categories) {
            categories[i]['percentage'] = Math.round(
                (categories[i].total / total) * 100
            )
        }

        return { total, categories }
    },

    getTotalAmount(expenses) {
        let total = 0

        for (let i in expenses) {
            total += expenses[i].amount
        }

        return total
    },

    formatCurrency(amount, currencySymbol = '&#36;') {
        // &#36; is the default value of '$', which gets
        // decoded in the return statement
        if (amount === undefined) return
        // toFixed(2) converts to 2 decimal places
        // This does not affect the math calculations
        // Only the value which is displayed

        let formatted = entities.decode(currencySymbol) + amount.toFixed(2)

        // This is for formatting negative dollar amounts so that
        // the negative (-) comes before the dollar sign ($)
        // Example: $-1000.00 --> -$1000.00
        if (currencySymbol === '&#36;' && amount < 0) {
            formatted = formatted.split('')
            let tempSymbol = formatted[0]
            formatted[0] = formatted[1]
            formatted[1] = tempSymbol
            return formatted.join('')
        }

        return formatted
    }
}
