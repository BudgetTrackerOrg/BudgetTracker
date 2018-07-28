import { combineReducers } from "redux";
import expenses from './reducer_expenses';

const allReducers = combineReducers({
    expenses
});

export default allReducers;