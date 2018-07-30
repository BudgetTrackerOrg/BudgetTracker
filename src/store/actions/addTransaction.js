const ADD_TRANSACTION = "ADD_TRANSACTION";

export default addTransaction = transaction => {
    alert(transaction);
    return {
        type: ADD_TRANSACTION,
        payload: transaction
    }
}

export { ADD_TRANSACTION };
