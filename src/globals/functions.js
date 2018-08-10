const MONTHS = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'Novemeber',
    'Decemeber'
]

export default {
    toTitleCase(str) {
        if (str == undefined) return
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        })
    },

    toSimpleDateString(date) {
        if (date == undefined) return
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

            if (categories[expenses[i].category] == undefined)
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
        if (amount == undefined) return
        return '$' + amount
    }
}
