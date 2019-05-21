import React, { Component } from 'react';
import NavBar from '../nav/NavBar'
import '../home/landingPage.css';
import Axios from 'axios';


class Contact extends Component {
    constructor() {
        super()
        this.state= {
            name:'',
            company: '',
            email: '',
            message:'',
            errors: [],
            loading: false,
            success: false
        };
    }
   
    handleChange= (e) => {
        this.setState ({
            [e.target.id]: e.target.value      
        })
    };

    // Form validation
    isformValid = () => {
        let errors = [];
        let error;

        if(this.isformEmpty(this.state)) {
            error = { message: 'Please fill in all fields' };
            this.setState({errors: errors.concat(error)});
            return false;
        } else {
            return true;
        }
    }

    // Check to see if there is a value provided to each property
    isformEmpty = ({ email, name, company, message }) => {
        return !email.length || !name.length || !company.length || !message.length;
    }
    
    // display errors
    displayErrors = errors => errors.map((error, i) =>
     <p key={i}>{error.message}</p>
     )

   handleSubmit = e => {
    e.preventDefault();
    if (this.isformValid()) { 
        this.setState({
            errors: [],
            loading: true
        });
        Axios.post("http://localhost:5000/api/users/send", {
            name: this.state.name,
            company: this.state.company,
            email: this.state.email,
            message: this.state.message  
        })
        .catch(error => {
            console.log(error);
            this.setState({errors: this.state.errors.concat(error), loading: false})
        })
        .then(this.setState({ email: "", name: "", company: "", message: "", loading: true }));   
            setTimeout(
                function() {
                this.setState({
                    loading: false,
                    success: true
                });
                }
                .bind(this),
                2000
            );
        } 
    }

    render(){
        const { name, company, email, message, errors, loading, success } = this.state;
        return (
            <section className="background" style={{background: '#1e90ff'}}>
            <i className="fas fa-bars" id="mobile-user-nav" style={{color: "#fff", marginTop: 15, marginLeft: "5%"}} onClick={this.props.open}></i>
            <NavBar />
            <div className="container">
                <h2 className="valign center" style={{color: "#FFF"}}>Do You Have a Question?</h2>
                <div className="row">
                    <div className="col offset-m3">
                        <form onSubmit={ this.handleSubmit } className="signin z-depth-0">

                            {/* Name input */} 
                            <input type="text" placeholder="Name" className="white grey-text input-container" id="name" value={ name } onChange={this.handleChange}></input>

                            {/* Company input */} 
                            <input type="text" placeholder="Company" className="white grey-text input-container" id="company" value={ company } onChange={this.handleChange}></input>
                            
                            {/* Email input */}  
                            <input type="email" placeholder="Email" className="white grey-text input-container " id="email" onChange={this.handleChange} value={email}></input>
                         
                            {/* Message input */}
                            <textarea type="text" placeholder="Message" className="matierialize-textarea white grey-text"  id="message" value={ message } onChange={this.handleChange}></textarea>
                          
                            {/* Button */}
                            <button type="submit" className="btn white blue-text z-depth-0" disabled={ loading }>
                                { loading && <i className="fas fa-spinner" id="loading" style={{color:"grey", marginRight: "10px"}}></i> }
                                Send
                            </button>   
              
                        </form>

                        {/* Display success message to user */} 
                        {success ? <p className="error-text center" style={{color: "#FFF", marginTop: 20}}>Thank you! Your message has been sent. <i className="far fa-smile" style={{color: "#FFF", fontSize: "24px"}}></i></p> : ""}
                        
                        {/* Error display */}
                        {errors.length > 0 && (
                            <message error className="center">
                                <p className="error-text" style={{color: "#FFF"}}><i class="material-icons prefix" style={{marginRight: "5px"}}>info</i>Oops...Something went wrong</p>
                                {this.displayErrors(errors)}
                            </message>
                        )}    
                    </div>
               </div>
            </div>
        </section>
        )
    };
};

export default (Contact);