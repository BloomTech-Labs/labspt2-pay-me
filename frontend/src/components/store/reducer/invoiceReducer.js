import { GET_INVOICES, GET_INVOICE, DELETE_INVOICE, ADD_INVOICE } from '../actions/type.js';

const initialState = {
    invoices: [],
    invoice: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_INVOICES:
            return {
                ...state,
                invoices: action.payload
            };
        case GET_INVOICE:
            return {
                ...state,
                invoice: action.payload
            };
        case DELETE_INVOICE:
            return {
                ...state,
                invoices: state.invoices.filter(invoice =>
                invoice.id !== action.payload)
            };
        case ADD_INVOICE:
            return {
                ...state,
                invoices: [action.payload, ...state.invoices]
            };
        default:
            return state;
    };
};
