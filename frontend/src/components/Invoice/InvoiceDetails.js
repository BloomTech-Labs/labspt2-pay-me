import React from 'react';
import {Link} from 'react-router-dom';

const InvoiceDetails = (props) => {
    const id = props.match.params.id;
    return (
        <div className="container invoice-details">
            <div className="col s12">
                <div className="input-field center">
                <Link to="/dashboard">
                    <button className="btn-large blue add-btn"><i className="material-icons white-text left">arrow_back</i>Back</button>
                </Link>
                </div>
                <div className="card z-depth-0 details">
                    <div className="card-content">
                    <span className="card-title">INVOICE {id}</span>
                    <p className="name-heading">James Juilian</p>
                    <p className="invoice-text">Digilight Media</p>
                    <p className="invoice-text">j.julian@gmail.com</p>
                    <p className="invoice-text">242-231-1234</p>
                    <p className="invoice-text-details">
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                    </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvoiceDetails;