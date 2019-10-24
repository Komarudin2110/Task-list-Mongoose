import React, { Component } from 'react'
import axios from '../config/axios'
import { connect } from 'react-redux'
import { Card, Form, Button } from 'react-bootstrap'
import { isNull } from 'util'
import Swal from 'sweetalert2'
import { Link, Redirect } from "react-router-dom";


export class EditProfile extends Component {
    state = {
        profile: null
    }

    componentDidMount() {
        axios.get(`/users/${this.props._id}`)
            .then(res => {
                this.setState({ profile: res.data })
            })
            .catch(err => {
                console.log(err);
            })
    }

    updateProfile = () => {
        let dataForm = new FormData()

        let name_ = this.name.value
        let email_ = this.email.value
        let age_ = this.age.value
        let password_ = this.password.value
        let avatar_ = this.avatar.files[0]

        dataForm.append("name", name_)
        dataForm.append("email", email_)
        dataForm.append("age", age_)
        dataForm.append("password", password_)
        dataForm.append("avatar", avatar_)

        axios.patch(`/users/${this.props._id}`, dataForm)
            .then(res => {
                if (res.data._message) {
                    return (Swal.fire(
                        'ERROR !',
                        res.data._message,
                        'error'
                    ))
                }
                Swal.fire(
                    'Profile Updated !',
                    'Yeay',
                    'success'
                ).then(res => {
                    setTimeout("location.reload(true)", 100)
                })
            }).catch(err => {
                Swal.fire(
                    'ERROR !',
                    err.message,
                    'error'
                )
            })
    }

    render() {
        if (this.props._id) {
            if (!isNull(this.state.profile)) {
                let { name, email, age } = this.state.profile.user
                return (
                    <div>
                        <Card className="p-3 mt-4 mx-auto" style={{ width: '60rem' }}>
                            <Card className="p-2">
                                <div className='container'>
                                    <form className="form-group">
                                        <h1 className="text-center">Edit Profile</h1>

                                        <h5>Name</h5>
                                        <input ref={(input) => this.name = input} className="form-control" defaultValue={name} type="text" />

                                        <h5>Email</h5>
                                        <input ref={(input) => this.email = input} className="form-control" defaultValue={email} type="email" />

                                        <h5>Age</h5>
                                        <input ref={(input) => this.age = input} className="form-control" defaultValue={age} type="text" />

                                        <h5>Password</h5>
                                        <input ref={(input) => this.password = input} className="form-control" placeholder="Password" type="password" />

                                        <div className="custom-file mt-4">
                                            <input ref={(input) => this.avatar = input} id="customFileLang" className="custom-file-input" type="file" />
                                            <label className="custom-file-label" htmlFor="customFileLang">Please insert file</label>
                                        </div>

                                    </form>
                                    <button onClick={this.updateProfile} className="mt-5 btn-block btn btn-outline-warning">Save</button>
                                </div>
                            </Card>
                        </Card>
                    </div>
                )
            }
            return <h1>LOADING ....</h1>
        }
        return <Redirect to="/login" />
    }
}

const mapStateToProps = state => {
    return {
        _id: state.auth._id
    }
}

export default connect(mapStateToProps)(EditProfile)
