import React from 'react';
import Nav from '../nav/Nav'
import '../../App.css';
import girlUser from '../../img/girl_user.png';
import guyUser from '../../img/guy_user.png';

const Home = () => {
    return (
        <div>
            <div className="showcase">
            <Nav />
                <div className="container">
                    <h2 className="center hero-text" style={{marginTop: 30}}>Quickly Create Invoices</h2>
                    <div className="center button-container" style={{marginTop: 30}}>
                        <a href="/signup" className="btn-large white blue-text z-depth-0 hero-button">Try Now</a>
                    </div>
                </div>
            </div>
        
            <section className="features">
                <div className="center">
                    <h2 className="center offer-section">What Pay Me Has to Offer?</h2>
                    <div className="container">
                        <div className="row">
                            <div className="col s12 m4">
                                <div className="card-panel z-depth-0">
                                    <i className="material-icons large blue-text">
                                        description
                                    </i>  
                                    <h5 className="card-text grey-text darken-4">Quickly generate invoices</h5>
                                    <p className="card-text grey-text darken-4">Quickly create invoices that can be store as PDF and emailed to clients</p>
                                </div>
                            </div>
                            <div className="col s12 m4">
                                <div className="card-panel z-depth-0">
                                    <i className="material-icons large blue-text">
                                        monetization_on
                                    </i>  
                                    <h5 className="card-text grey-text darken-4">Accept Payments Online</h5>
                                    <p className="card-text grey-text darken-4">No more waiting in line at the bank. Clients can pay  you securly online with the click of a button</p>
                                </div>
                            </div>
                            <div className="col s12 m4">
                                <div className="card-panel z-depth-0">
                                    <i className="material-icons large blue-text">
                                        notifications
                                    </i>  
                                    <h5 className="card-text grey-text darken-4">Set Payment Reminders</h5>
                                    <p className="card-text grey-text darken-4">Set up automatic payment reminders to alert your client whenever payment is due</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="call-to-action">
                <div className="container call-to-action">
                    <div className="row">
                        <div className="col s6 call-to-action-content">
                            <img src={girlUser} id="user-image" className="responsive-img" />
                        </div>
                        <div className="col s6 call-to-action-content-top">
                            <h2 className="call-to-action-top-text">Start Invoicing Now</h2>
                            <p className="card-paragraph">Get access to all of the Pay Me features. Including online payments, automatic payment reminders and text support.</p>
                            <div>
                                <a href="/signup" className="waves-effect waves-light btn-large btn-flat white blue-text btn-call-to-action">Try Pay Me</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="call-to-action-2">
                <div className="container">
                    <div className="row">
                        <div className="col s6 call-to-action-content-bottom">
                            <h2 className="call-to-action-bottom-text">Lightweight, Flexible,</h2>
                            <h2 className="call-to-action-bottom-text">Easy.</h2>
                            <p className="card-paragraph pg-inverse">Pay Me offers a straightforward design with easy to use features. When you need to invoice a client, simply create a new invoice, add client details and send it off to your client.</p>
                        </div>
                        <div className="col s6 call-to-action-content">
                            <img src={guyUser} id="user-image" className="responsive-img"/>
                        </div>
                    </div>
                </div>
            </section>

            <footer>
                <div className="container">
                    <div className="center">
                        <p className="card-text">Copyright 2019, Pay Me. All rights reserved</p>
                    </div>
                </div>
            </footer>
        </div> 
    )
}

export default Home;