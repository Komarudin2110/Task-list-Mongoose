import Swal from 'sweetalert2'

export const sendData = (username, _id) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: {
            username,
            _id
        }
    }
}
// ACTION LOGOUT
export const logoutAcc = () => {
    localStorage.removeItem('user')
    Swal.fire(
        'Logout Success',
        'Bye !',
        'success'
    )
    return {
        type: 'LOGOUT_SUCCESS'
    }
}

// ACTION KEEP LOGIN
export const keepLogin = (user) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            _id: user._id,
            username: user.username,
        }
    }
}