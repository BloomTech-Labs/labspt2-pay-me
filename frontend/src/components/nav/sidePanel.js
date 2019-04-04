import React, { Component } from "react";
import { Menu, Grid, Header, Dropdown, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../../Dashboard.css';


class SidePanel extends Component {

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    dropdownOptions = () => [
        {   
            key: "user",
            text: <span>Signed in as <strong>User</strong></span>,
            disabled: true
        },
        {
            key: "signOut",
            text: <span>Sign Out</span>
        }
    ]

    render() {
        return (
            <Menu size="large" inverted fixed="left" vertical style={{ background: "#1E90FF", fontSize: "1.2rem"}}>
               <Grid.Column>
                   
                    <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
                        <Header inverted floated="left" as="h2">
                            <Header.Content>PayMe</Header.Content>
                        </Header>
                    </Grid.Row>

                        <Header style={{padding: "0.50em"}} as="h4" inverted>
                            <Dropdown trigger={ <span>User</span>} options={this.dropdownOptions()}/>
                        </Header>

                    <Grid.Row>    
                      <ul style={{listStyle:"none"}}>
                          <Link to="/dashboard"><li className="nav-item">Invoices</li></Link>
                          <Link to="#"><li className="nav-item" >Reminders</li></Link>
                          <Link to="/settings"><li className="nav-item">Settings</li></Link>
                          <Link to="/billing"><li className="nav-item">Billing</li></Link>
                          <Link to="#"><li className="nav-item">Support Center</li></Link>
                      </ul> 
                    </Grid.Row>
                    <Grid.Row>
                        <Link to="/create">
                            <Button color="blue" fluid size="large" icon="plus" iconPosition="left" style={{marginTop: 30}}>New Invoice</Button>
                        </Link>
                      </Grid.Row>
                </Grid.Column>
            </Menu>       
        )
    }
}

export default SidePanel;