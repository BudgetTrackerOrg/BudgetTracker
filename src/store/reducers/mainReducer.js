export default function() {
    return {
        id:
            '_' +
            Math.random()
                .toString(36)
                .substr(2, 9),
        expenses: [],
        income: [],
        totalSum: 0
    }
}
