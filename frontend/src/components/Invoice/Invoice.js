import React from 'react';


const Invoice = ({invoice}) => {
        return (
            <div className="card white z-depth-1">
            <div className="card-content">
                <div className="card-top">
                    <a href="#">
                        <p className="right"><i className="material-icons close">close</i></p>
                    </a>
                    <a href="#">
                        <p className="right card-icon-top">Update</p>	
                    </a>
                </div>
                <span className="card-title">INVOICE {invoice.id}</span>
                <p className="name-heading">{invoice.clientName}</p>
                <p className="invoice-text">{invoice.company}</p>
                <p className="invoice-text">{invoice.clientEmail}</p>
                <p className="invoice-text">{invoice.clientPhone}4</p>
                <div className="pdf-icon right">
                    <a href="#">
                    <i className="far fa-file-pdf" />
                    </a>
                </div> 
            </div>

        <div className="card-action">
            <i className="fas fa-bell" />
            <span className="reminder-text">M W F</span>
            <a href="#">
                <i className="fas fa-mail" />
            </a>
            <a href="#">
                <i className="fas fa-mobile-alt right" />
            </a>
            <a href="#">
                <i className="fas fa-envelope right" />
            </a>	
        </div> 
    </div>  
        )   
}

export default Invoice;