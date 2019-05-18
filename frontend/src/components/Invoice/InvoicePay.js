import React from 'react';
import axios from 'axios';
import serverLoc from '../../serverLoc';
import '../../Dashboard.css';
import decode from 'jwt-decode';
import Sidenav from '../nav/Sidenav';
import InvoicePayCard from './InvoicePayCard';

class InvoicePay extends React.Component {
    constructor() {
        super();
        this.state = {
            isClientAccount: false,
            invoices: '',
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('jwt');
        const id = decode(token).subject;
        axios.get(`${serverLoc}/api/users/${id}`)
        .then(res => {
            if (res.data[0].client_id !== null) {
                console.log(res.data);
                axios.get(`${serverLoc}/api/invoices/client/${res.data[0].client_id}`, {
                    headers: {
                        Authorization: token,
                    }
                })
                .then(res => {
                    console.log('invoices')
                    console.log(res.data);
                    this.setState({
                        isClientAccount: true,
                        invoices: res.data,
                    })
                }) 
                .catch(err => {
                    console.log(err);
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        if (!this.state.isClientAccount) {
            return (
                <div>
                    <Sidenav />
                    <h4>Not a client account.</h4>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Sidenav />
                    <center>
                    <h4>Client Account.</h4>
                    {this.state.invoices !== undefined ? this.state.invoices.map(invoice => {
                        return (
                            <InvoicePayCard invoice={invoice} />
                        )
                    }) : <></>}
                    </center>
                </div>
            )
        }
    }
}

export default InvoicePay