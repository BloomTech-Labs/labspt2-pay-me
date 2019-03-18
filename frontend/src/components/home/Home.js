import React from 'react';
import Nav from '../nav/Nav'
import {  NavLink } from 'react-router-dom';
import '../../App.css';
import girlUser from '../../img/girl_user.png';
import guyUser from '../../img/guy_user.png';
const Home = () => {
    return (
        <div>  
            <section className="showcase">
                <Nav />
                <div className="container">
                    <div className="showcase-heading">
                        <h2 className="center">Quickly Create Invoices For Your Business</h2>
                        <div className="center button-container">
                            <NavLink to="/signup" className="btn-large white blue-text z-depth-0">Try Now</NavLink>
                        </div>
                    </div>
                </div>
            </section>
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
                                    <h5 className="card-text">Quickly generate invoices</h5>
                                    <p className="card-text grey-text darken-4">Quickly create invoices that can be store as PDF and emailed to clients</p>
                                </div>
                            </div>
                            <div className="col s12 m4">
                                <div className="card-panel z-depth-0">
                                    <i className="material-icons large blue-text">
                                        monetization_on
                                    </i>  
                                    <h5 className="card-text">Accept Payments Online</h5>
                                    <p className="card-text grey-text darken-4">No more waiting in line at the bank. Clients can pay  you securly online with the click of a button</p>
                                </div>
                            </div>
                            <div className="col s12 m4">
                                <div className="card-panel z-depth-0">
                                    <i className="material-icons large blue-text">
                                        notifications
                                    </i>  
                                    <h5 className="card-text">Set Payment Reminders</h5>
                                    <p className="card-text grey-text darken-4">Set up up automatice payment reminders to alert your client whenever payment is due</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="call-to-action">
                <div className="container">
                    <div className="row">
                        <div className="col s6 call-to-action-content">
                            <img src={girlUser} />
                        </div>
                        <div className="col s6 call-to-action-content">
                            <h2>Start Invoicing Now</h2>
                            <h5>Get access to all of the Pay Me features. Including online payments, automatic payment reminders and text support.</h5>
                            <div>
                                <NavLink to="/signup" className="waves-effect waves-light btn-large btn-flat white blue-text btn-call-to-action">Try Pay Me</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="call-to-action-2">
                <div className="container">
                    <div className="row">
                        <div className="col s6 call-to-action-content">
                            <h3 className="card-text">Lightwieght.Easy.Flexible</h3>
                            <h5 className="card-text">Pay Me offers a straightforward design with easy to use features. When you need to invoice a client, simply create a new invoice, add client dietails and send it off to your client.</h5>
                        </div>
                        <div className="col s6 call-to-action-content">
                            <img src={guyUser} />
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