export { default as addTransaction } from './addTransaction'
export { ADD_TRANSACTION } from './addTransaction' //this is what caused the reducer to not pick up the action, because in the reducer it was undefined as nothing was specificed in this file, please remove this comment once read, greg. nameste
