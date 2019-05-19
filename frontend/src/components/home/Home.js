import React from 'react';
import NavBar from '../nav/NavBar'
import './landingPage.css';
import girlUser from '../../img/girl_user.png';
import guyUser from '../../img/guy_user.png';
import { NavLink } from 'react-router-dom';


const Home = () => {
    return (
        <div>
            <section className="overlay-image">
                <div className="overlay">
                    <NavBar />
                    <div className="container">
                        <div className="row">
                            <div className="col s6">
                            <h3 className="hero-text" style={{marginTop: 200, lineHeight: 1.2,color: "#ffff"}}>Quickly Create Invoices <br></br>For Your Business</h3>
                            <p style={{ marginTop: 30, color: "#ffff" }}>Pay Me is application that allow you to easily create, send and pay invoices from your desktop or smartphone. It's fast and easy!</p>
                            
                            <NavLink to ="/signup">
                                <a className="btn-large z-depth-0 white-text hero-btn" style={{fontSize: "14px", marginTop: 20, backgroundColor: '#01d387'}}>Try Pay Me</a>
                            </NavLink>

                            </div>
                            
                            <div className="col s6">
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="features" style={{backgroundColor: "#fff", paddingBottom: 10}}>
                <div className="container"> 
                    <div className="row" style={{paddingTop: 40, paddingTop: 40}}>
                    <h1 className="center" >Nice, Clean and Simple Features</h1>
                        <div className="col s12 m4 center">
                            <div className="card-panel z-depth-0 feature-card">
                                <i className="fas fa-tasks fas-3x" style={{fontSize: "42px"}}></i>
                                <h5>Stay organized</h5>
                                <p>Find notes quickly with instant searching and simple tags.</p>
                            </div>
                        </div>

                        <div className="col s12 m4 center">
                            <div className="card-panel z-depth-0 feature-card">
                                <i className="fas fa-user-friends fas-3x" style={{fontSize: "42px"}}></i>
                                <h5>Work together</h5>
                                <p>Share a list, post some instructions, or publish your notes online.</p>
                            </div>
                        </div>

                        <div className="col s12 m4 center">
                            <div className="card-panel z-depth-0 feature-card">
                                <i class="fas fa-cloud fas-3x" style={{fontSize: "42px"}}></i>
                                <h5>Use it everywhere</h5>
                                <p>Your notes stay updated across all your devices. No buttons to press. It just works.</p>
                            </div>
                        </div>

                        <div className="col s12 m4 center">
                            <div className="card-panel z-depth-0 feature-card">
                                <i className="fas fa-check fas-3x" style={{fontSize: "42px"}}></i>
                                <h5>Get things done</h5>
                                <p>Manage projects, take meeting notes, set reminders, and edit documents.</p>
                            </div>
                        </div>

                        <div className="col s12 m4 center">
                            <div className="card-panel z-depth-0 feature-card">
                                <i className="fas fa-user-tag fas-3x" style={{fontSize: "42px"}}></i>
                                <h5>Tag</h5>
                                <p>Highlight can’t-miss notes with Important and To-Do tags.</p>
                            </div>
                        </div>

                        <div className="col s12 m4 center">
                            <div className="card-panel z-depth-0 feature-card">
                                <i class="fas fa-star fas-3x" style={{fontSize: "42px"}}></i>
                                <h5>It's free</h5>
                            <p>Note taking, syncing, sharing — it’s all completely free.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="" style={{backgroundColor: "#1e90ff", paddingBottom: 50}}>
                <div className="container"> 
                    <div className="row" style={{paddingTop: 40}}>
                        <h1 className="center" style={{color: "#fff"}} >Sign Up to Try Pay Me Today</h1>
                        <div className="col s6 call-to-action-content">
                            <img src={girlUser} id="user-image" className="responsive-img" />
                        </div>
                    
                        <div className="col s6 call-to-action-content-top">
                            <h2 className="call-to-action-top-text" style={{color: "#fff"}}>Start Invoicing Now</h2>
                            <p className="card-paragraph" style={{color: "#fff"}}>Get access to all of the Pay Me features including online payments, automatic payment reminders and text support. Get access to all of the Pay Me features. Including online payments, automatic payment reminders and text support</p>
                            
                            <NavLink to ="/signup">
                                <a className="btn-large z-depth-0 white-text hero-btn" style={{fontSize: "14px", marginTop: 20, backgroundColor: '#01d387'}}>Try Pay Me</a>
                            </NavLink>
                            
                        </div>
                    </div>
                </div>
            </section>

            <section id="" style={{backgroundColor: "#EAF7FF", paddingBottom: 70}}>
                <div className="container"> 
                    <div className="row" style={{paddingTop: 40, paddingTop: 40}}>
                        <div className="col s6 call-to-action-content-bottom">
                            <h2 className="call-to-action-bottom-text" style={{color: "#1e90ff"}}>Lightweight, Flexible,<br></br>Easy to Use</h2>
                            <p className="card-paragraph">Pay Me offers a straightforward design with easy to use features. When you need to invoice a client, simply create a new invoice, add client details and send it off to your client.</p>
                        </div>
                    
                        <div className="col s6 call-to-action-content">
                            <img src={guyUser} id="user-image" className="responsive-img"/>   
                        </div>
                    </div>
                </div>
            </section>

            <footer style={{backgroundColor: "#FFF", paddingTop: 10, paddingBottom: 10}}>
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