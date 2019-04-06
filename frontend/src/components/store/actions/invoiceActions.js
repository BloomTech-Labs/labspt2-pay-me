import { GET_INVOICES, GET_INVOICE, ADD_INVOICE, DELETE_INVOICE } from './type';
import axios from 'axios';

export const getInvoices = () => async dispatch => {
    const res = await axios.get('http://localhost:5000/api/invoices');
    dispatch({
        type: GET_INVOICES,
        payload: res.data
    });
};

export const getInvoice = (id) => async dispatch => {
    const res = await axios.get(`http://localhost:5000/api/invoices/${id}`);
    dispatch({
        type: GET_INVOICE,
        payload: res.data
    });
};

export const addInvoice = (invoice) => {
    return {
        type: ADD_INVOICE,
        payload: invoice
    };
};

export const deleteInvoice = id => async dispatch=> {
    await axios.delete
    (`http://localhost:5000/api/invoices/${id}`);
    dispatch({
        type: DELETE_INVOICE,
        payload: id
    });
};