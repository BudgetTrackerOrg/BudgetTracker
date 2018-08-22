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
        // NOTE
        // props.dateAdded returns with a format of
        // ex: 1969-07-20T07:20:18.000Z
        // which we cannot apply getMonth, getDate, and getFullYear to.
        // They all follow the same format, so substrings are applied equally.

        // let str = MONTHS[date.getMonth()]
        let str = MONTHS[parseInt(date.substr(5, 2)) - 1]
        // str += ' ' + date.getDate()
        str += ' ' + date.substr(8, 2)
        // str += ', ' + date.getFullYear()
        str += ', ' + date.substr(0, 4)
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

    formatCurrency(amount) {
        if (amount === undefined) return
        return '$' + amount
    }
}
