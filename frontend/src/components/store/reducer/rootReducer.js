import invoiceReducer from './invoiceReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    invoice: invoiceReducer
})

export default rootReducer;