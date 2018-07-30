export default transaction => {
    return {
        ...transaction,
        actionType: 'ADD_TRANSACTION'
    }
}
