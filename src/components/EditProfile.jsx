import React, { Component } from 'react'
import axios from '../config/axios'
import { connect } from 'react-redux'
import { Card, Form, Button } from 'react-bootstrap'
import { isNull } from 'util'
import Swal from 'sweetalert2'
import { Redirect } from "react-router-dom";


export class EditProfile extends Component {
    state = {
        profile: null,
        avatarName: ''
    }

    componentDidMount() {
        axios.get(`/users/profile/${this.props.username}`)
            .then(res => {
                this.setState({ profile: res.data })
            })
            .catch(err => {
                console.log(err);
            })
    }

    changeAvatar = () => {
        this.setState({ avatarName: this.avatar.files[0].name })
    }

    updateProfile = () => {
        let formData = new FormData()
        let _name = this.name.value
        let _email = this.email.value
        let _password = this.password.value
        let _avatar = this.avatar.files[0]

        formData.append("name", _name)
        formData.append("email", _email)
        if (_password) formData.append("password", _password)
        if (_avatar) formData.append("avatar", _avatar)

        axios.patch(`/users/${this.props.username}`, formData)
            .then(res => {
                if (res.data.error) {
                    return (Swal.fire(
                        'ERROR !',
                        res.data.error,
                        'error'
                    ))
                }
                Swal.fire(
                    'Profile Updated !',
                    'Yeay',
                    'success'
                )
            }).catch(err => {
                Swal.fire(
                    'ERROR !',
                    err.sqlMessage,
                    'error'
                )
            })
    }



    render() {
        if (this.props.username) {
            if (!isNull(this.state.profile)) {
                let { name, email } = this.state.profile
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

                                        <h5>Password</h5>
                                        <input ref={(input) => this.password = input} className="form-control" placeholder="Password" type="password" />

                                        <div className="custom-file mt-4">
                                            <input onChange={this.changeAvatar} ref={(input) => this.avatar = input} id="customFileLang" className="custom-file-input" type="file" />
                                            <label className="custom-file-label" htmlFor="customFileLang">{this.state.avatarName ? this.state.avatarName : "Choose File"}</label>
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
        id: state.auth.id,
        username: state.auth.username
    }
}

export default connect(mapStateToProps)(EditProfile)
