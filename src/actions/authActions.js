import actionTypes from '../constants/actionTypes';

const env = process.env;

function userLoggedIn(username) {
    return {
        type: actionTypes.USER_LOGGEDIN,
        username: username
    }
}

function userLogout() {
    return {
        type: actionTypes.USER_LOGOUT
    }
}

export function logout() {
    return dispatch => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        dispatch(userLogout());
    }
}

export function login(credentials) {
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials),
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        }).then((res) => {
            if (res.success) {
                localStorage.setItem('token', res.token);
                localStorage.setItem('username', credentials.username);
                dispatch(userLoggedIn(credentials.username));
            }
            return res;
        }).catch((e) => console.log(e));
    }
}

export function register(userData) {
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        }).catch((e) => console.log(e));
    }
}

// Check if user is already logged in (on page refresh)
export function checkAuth() {
    return dispatch => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (token && username) {
            dispatch(userLoggedIn(username));
        }
    }
}