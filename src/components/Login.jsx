import React, { Component } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import {
    Link, Redirect
} from "react-router-dom";
import { sendData } from '../Actions/index'
import axios from '../config/axios'
import { connect } from 'react-redux'


export class Login extends Component {
    loginSubmit = async () => {
        let email_ = this.email.value
        let password_ = this.password.value
        try {
            await axios.post(
                'users/login',
                {
                    email: email_,
                    password: password_
                }
            )
                .then(res => {
                    if (res.data.err) {
                        return (Swal.fire(
                            'Login Gagal',
                            `${res.data.err}`,
                            'error'
                        ))
                    }
                    let { username, _id } = res.data
                    localStorage.setItem('user', JSON.stringify({ username, _id }))
                    this.props.sendData(username, _id)
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
        if (!this.props._id) {
            return (
                <div>
                    <Card className="mx-auto mt-5 p-4 col-12 col-sm-5 col-md-5">
                        <h1>Login</h1>
                        <hr className="w-25"></hr>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control ref={(input) => this.email = input} type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control ref={(input) => this.password = input} type="password" placeholder="Password" />
                            </Form.Group>
                            <Button onClick={this.loginSubmit} variant="primary">
                                Submit
                        </Button>
                        </Form>
                        <Form.Text className="text-muted mt-3">
                            Don't have an account? <Link to="Register">Register now</Link>
                        </Form.Text>
                    </Card>
                </div>
            )
        } else {
            return (<Redirect to="/" />)
        }


    }
}
const mapStateToProps = (state) => {
    return {
        _id: state.auth._id,
        _username: state.auth.username
    }
}


export default connect(mapStateToProps, { sendData })(Login)