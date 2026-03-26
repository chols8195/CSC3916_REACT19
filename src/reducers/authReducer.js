import actionTypes from '../constants/actionTypes';

const initialState = {
    loggedIn: localStorage.getItem('token') ? true : false,
    username: localStorage.getItem('username') || ''
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.USER_LOGGEDIN:
            return {
                ...state,
                loggedIn: true,
                username: action.username
            };
        case actionTypes.USER_LOGOUT:
            return {
                ...state,
                loggedIn: false,
                username: ''
            };
        default:
            return state;
    }
}