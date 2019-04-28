import { GET_INVOICES, GET_INVOICE, ADD_INVOICE, DELETE_INVOICE } from './type';
import axios from 'axios';
import serverLoc from '../../../serverLoc';

export const getInvoices = () => async dispatch => {
    const token = localStorage.getItem('jwt');
    const res = await axios.get(`${serverLoc}/api/invoices`, {headers: {'Authorization': token}});
    dispatch({
        type: GET_INVOICES,
        payload: res.data
    });
};

export const getInvoice = (id) => async dispatch => {
    const token = localStorage.getItem('jwt');
    const res = await axios.get(`${serverLoc}/api/invoices/${id}`, {headers: {'Authorization': token}});
    dispatch({
        type: GET_INVOICE,
        payload: res.data
    });
};

export const addInvoice = async (invoice) => {
    const token = localStorage.getItem('jwt');
    const res = await axios.post(`${serverLoc}/api/invoices`, {headers: {'Authorization': token}});
    return {
        type: ADD_INVOICE,
        payload: res.data
    };
};

export const deleteInvoice = id => async dispatch=> {
    const token = localStorage.getItem('jwt');
    await axios.delete(`${serverLoc}/api/invoices/${id}`, {headers: {'Authorization': token}});
    dispatch({
        type: DELETE_INVOICE,
        payload: id
    });
};