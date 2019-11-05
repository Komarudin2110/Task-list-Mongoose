import React, { Component } from 'react'
import { Navbar, Nav, Dropdown, Button, NavDropdown } from "react-bootstrap"
import {Link} from "react-router-dom";
import { connect } from 'react-redux'
import { logoutAcc } from '../Actions/index'

export class Header extends Component {
    renderNavigation = () => {
        if (!this.props.getUsername) {
            return (
                <Nav className="ml-auto mr-5 text-white">
                    <Link to="/login"><Button variant="outline-light" className="mr-3 mb-1">Login</Button></Link>
                    <Link to="/register"><Button on variant="outline-light" className="mr-3 mb-1">Register</Button></Link>
                </Nav>
            )
        } else {
            return (
                <Nav className="ml-auto mr-1">
                    <Link to="/"><Button variant="outline" className="mr-4 mb-1 text-white">Task</Button></Link>
                    <Dropdown className="ml-auto mr-5">
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            Hello , {this.props.getUsername}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Link to="/profile" className="dropdown-item" >Profile</Link>
                            <Link to="/Edit-profile" className="dropdown-item">Edit Profile</Link>
                            <Dropdown.Divider />
                            <NavDropdown.Item className="mx-auto" onClick={this.props.logoutAcc}>Log Out</NavDropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
                // <Nav className="ml-auto mr-5">
                //     <Link to="/"><Button variant="outline" className="mr-3 mb-1 text-white">Task</Button></Link>
                //     <NavDropdown title={"Hello, " + this.props.getUsername} id="collasible-nav-dropdown">
                //         <Link to="/profile"><Button variant="outline" className="mb-1 ml-2">Profile</Button></Link>
                //         <NavDropdown.Item className="mx-auto" onClick={this.props.logoutAcc}>Log Out</NavDropdown.Item>
                //     </NavDropdown>
                // </Nav>

            )
        }
    }

    render() {
        return (
            <div>
                <Navbar bg="dark" expand="lg">
                    <Navbar.Brand className="ml-5 text-white" href="/">React-Mongoose</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {this.renderNavigation()}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        getUsername: state.auth.username
    }
}

export default connect(mapStateToProps, { logoutAcc })(Header)
