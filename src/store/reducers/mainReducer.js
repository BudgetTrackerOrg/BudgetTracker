export default (state = initialState(), action) => {
    return state
}

const initialState = () => {
    return {
        id:
            '_' +
            Math.random()
                .toString(36)
                .substr(2, 9),
        totalSum: 0
    }
}
