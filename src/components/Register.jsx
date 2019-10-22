import React, { Component } from 'react'
import axios from '../config/axios'
import Swal from 'sweetalert2'
import { Card, Form, Button } from 'react-bootstrap'
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
export class Register extends Component {

    registSubmit = async () => {
        let username_ = this.username.value
        let name_ = this.name.value
        let age_ = this.age.value
        let email_ = this.email.value
        let password_ = this.password.value
        try {
            await axios.post(
                '/users',
                {
                    username: username_,
                    name: name_,
                    age: age_,
                    email: email_,
                    password: password_
                }
            ).then(res => {
                if (res.data.err) {
                    return (Swal.fire(
                        'Register Gagal',
                        `${res.data.err}`,
                        'error'
                    ))
                }
                Swal.fire(
                    'Register Berhasil',
                    'Selamat Datang !',
                    'success'
                )
            })
        } catch (error) {
            Swal.fire(
                'ERROR!',
                error.message,
                'error'
            )
        }
    }

    render() {
        if (!this.props.getId) {
            return (
                <div>
                    <Card className="mx-auto mt-5 p-4 col-12 col-sm-5 col-md-5">
                        <h1>Register</h1>
                        <hr className="w-25"></hr>
                        <Form>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control ref={(input) => this.username = input} type="text" placeholder="Enter Username" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control ref={(input) => this.name = input} type="text" placeholder="Enter Name" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Age</Form.Label>
                                <Form.Control ref={(input) => this.age = input} type="number" placeholder="Enter Age" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control ref={(input) => this.email = input} type="email" placeholder="Enter E-mail" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control ref={(input) => this.password = input} type="password" placeholder="Enter Password" />
                            </Form.Group>
                        </Form>
                        <Button variant="primary" type="submit" onClick={this.registSubmit} >
                            Submit
                    </Button>
                        <Form.Text className="text-muted mx-auto mt-3">
                            Already have an account ? <Link to="/login">Login now</Link>
                        </Form.Text>
                    </Card>
                </div>
            )
        } else {
            return (<Redirect to="/" />)
        }

    }
}

const mapStateToProps = state => {
    return {
        getId: state.auth._id,
        getUsername: state.auth.username
    }
}


export default connect(mapStateToProps)(Register)
