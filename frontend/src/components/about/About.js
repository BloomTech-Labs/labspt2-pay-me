import React from 'react';
import Nav from '../nav/Nav'
import '../../App.css';

const About = () => {
    return (
        <div>
            <div className="background">
            <Nav />
                <div className="container">
                    <div className="heading-about center">
                        <h1>About Pay Me</h1>
                    </div>
                    <h5 className="about-text">
                        Pay Me allows clients to easily resolve and manage their outstanding invoices. Users can create, view and set reminders for invocies. Pay Me allows
                        give client customers the ability to pay their outstanding invoices onlines.
                    </h5>
                </div>
            </div>
        </div>
    )
}

export default About;