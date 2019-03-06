import React from 'react';
import Nav from '../nav/Nav'
import '../../App.css';

const Home = () => {
    return (
        <div>
            <div className="showcase">
            <Nav />
                <div className="container">
                    <h3 className="center">Quickly Create Invoices For Your Business</h3>
                    <div className="center button-container">
                        <a className="waves-effect waves-light btn-large white blue-text">Try Now</a>
                    </div>
                </div>
            </div>
        </div>

        
   
    )
}

export default Home;