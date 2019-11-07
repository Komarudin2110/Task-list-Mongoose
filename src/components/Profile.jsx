import React, { Component } from 'react'
import axios from '../config/axios'
import { connect } from 'react-redux'
import { isNull } from 'util'
import { Card } from 'react-bootstrap'
import { Link, Redirect } from "react-router-dom";


export class Profile extends Component {
    state = {
        takeProfile: null
    }

    componentDidMount() {
        axios.get(`/users/profile/${this.props.username}`)
            .then(res => {
                this.setState({ takeProfile: res.data })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        if (this.props.id) {
            if (!isNull(this.state.takeProfile)) {
                let profile = this.state.takeProfile
                console.log(profile);

                return (
                    <div>
                        <Card className="p-3 mt-5 mx-auto" style={{ width: '40rem' }}>
                            <Card className="text-center">
                                <img className="mx-auto d-block mt-5 rounded-circle mb-4" src={profile.avatar} alt="" />
                                <h1>Hello, {profile.username}</h1>
                                <p>{profile.name} | {profile.age} | {profile.email}</p>
                            </Card>
                        </Card>
                    </div>
                )
            }
            return <h1>LOADING.....</h1>
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

export default connect(mapStateToProps)(Profile)
