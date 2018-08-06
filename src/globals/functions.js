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
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        })
    },

    toSimpleDateString(date) {
        let str = MONTHS[date.getMonth()]
        str += ' ' + date.getDate()
        str += ', ' + date.getFullYear()
        return str
    }
}
