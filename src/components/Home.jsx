import React, { Component } from 'react'
import { Card, Form, Button, Table, FormCheck } from 'react-bootstrap'
import './style.css'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import {
    Link, Redirect
} from "react-router-dom";
import axios from '../config/axios'



export class Home extends Component {
    state = {
        taskUser: [],
    }

    // Fn jika task telah selesai
    doneTask = async (taskId) => {
        try {
            await axios.patch(`/task/update/${taskId}`,
                {
                    completed: true
                })
            this.componentDidMount()
        } catch (error) {
            Swal.fire(
                'ERROR!',
                error.message,
                'error'
            )
        }
    }

    cancelTask = async (taskId) => {
        try {
            await axios.patch(`/task/update/${taskId}`,
                {
                    completed: false
                })
            this.componentDidMount()
        } catch (error) {
            Swal.fire(
                'ERROR!',
                error.message,
                'error'
            )
        }
    }

    doubleClick = async (taskId) => {
        try {
            const result = await Swal.fire({
                title: 'Hapus task ini ?',
                text: "",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Iya !'
            })
            if (result.value) {
                console.log(taskId);
                await axios.delete(`/task/${taskId}`)
                this.componentDidMount()
                Swal.fire(
                    'Task berhasil di hapus!',
                    '',
                    'success'
                )
            }
        } catch (error) {
            Swal.fire(
                'ERROR!',
                error.message,
                'error'
            )
        }
    }

    submitTask = async () => {
        let userID = this.props._id
        let taskToDo = this.task.value
        try {
            await axios.post(
                `/task/${userID}`,
                {
                    description: taskToDo
                })
            this.task.value = ''
            this.componentDidMount()
        } catch (error) {
            Swal.fire(
                'ERROR!',
                error.message,
                'error'
            )
        }
    }

    showTask = () => {
        let rendTask = this.state.taskUser.map(val => {
            if (!val.completed) {
                return (
                    <tr onDoubleClick={() => { this.doubleClick(val._id) }} className="text-center">
                        <td>{val.description}</td>
                        <td>
                            <Button variant="success" onClick={() => { this.doneTask(val._id) }} className="mr-3">Done</Button>
                        </td>
                    </tr>
                )
            }
            return (
                <tr onDoubleClick={() => { this.doubleClick(val._id) }} className="text-center">
                    <td><strike><i>{val.description}</i></strike></td>
                    <td>
                        <Button variant="danger" onClick={() => { this.cancelTask(val._id) }} className="mr-3">Cancel</Button>
                    </td>
                </tr>
            )
        })
        return rendTask
    }

    componentDidMount() {
        let userID = this.props._id
        axios.get(
            `/task/${userID}`
        ).then((res) => {
            this.setState({ taskUser: res.data })
        })
    }

    render() {
        if (this.props._id) {
            return (
                <div className="row container mt-5 ">
                    <div className="col-12 col-md-5">
                        <Card style={{ width: '90%' }} className="p-2 ml-4">
                            <Card>
                                <h2 className="mx-auto mt-3">Input Task !</h2>
                                <hr className="w-50 mx-auto"></hr>
                                <Form>
                                    <Form.Group className="w-75 mx-auto">
                                        <Form.Control ref={(input) => this.task = input} type="text" placeholder="What do you want to do ?" />
                                    </Form.Group>
                                </Form>
                                <Button onClick={this.submitTask} style={{ width: '40%' }} variant="info" className="mb-3 mx-auto">Up !</Button>
                            </Card>
                        </Card>
                    </div>
                    <div className="col-9 col-md-6">
                        <Card style={{ width: '150%' }} className=" p-2">
                            <Table striped bordered hover>
                                <thead className="text-center">
                                    <tr>
                                        <th style={{ width: '31rem' }}><h1 className="mt-1">List Tasks</h1></th>
                                        <th><h5 className="mt-1 mb-3 mx-auto">Action</h5></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.showTask()}
                                </tbody>
                            </Table>
                        </Card>
                    </div>
                </div>
            )
        } else {
            return (<Redirect to="/login" />)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        _id: state.auth._id,
        _username: state.auth.username
    }
}
export default connect(mapStateToProps)(Home)
