import actionTypes from '../constants/actionTypes';

const env = process.env;

function moviesFetched(movies) {
    return {
        type: actionTypes.FETCH_MOVIES,
        movies: movies
    }
}

function movieFetched(movie) {
    return {
        type: actionTypes.FETCH_MOVIE,
        selectedMovie: movie
    }
}

function movieSet(movie) {
    return {
        type: actionTypes.SET_MOVIE,
        selectedMovie: movie
    }
}

function reviewPosted(review) {
    return {
        type: actionTypes.POST_REVIEW,
        review: review
    }
}

export function setMovie(movie) {
    return dispatch => {
        dispatch(movieSet(movie));
    }
}

export function fetchMovies(status = null) {
    return dispatch => {
        let url = `${env.REACT_APP_API_URL}/movies?reviews=true`;
        if (status) {
            url += `&status=${status}`;
        }

        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        }).then((res) => {
            dispatch(moviesFetched(res.movies));
        }).catch((e) => console.log(e));
    }
}

export function fetchMovie(movieId) {
    return dispatch => {
        console.log('fetchMovie called with ID:', movieId);
        console.log('Token:', localStorage.getItem('token'));
        
        return fetch(`${env.REACT_APP_API_URL}/movies/${movieId}?reviews=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'
        }).then((response) => {
            console.log('fetchMovie response status:', response.status);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        }).then((res) => {
            console.log('fetchMovie response data:', res);
            if (res.movie) {
                dispatch(movieFetched(res.movie));
            } else {
                console.log('No movie in response');
            }
        }).catch((e) => {
            console.log('fetchMovie error:', e);
        });
    }
}

export function submitReview(reviewData) {
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/reviews`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(reviewData),
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        }).then((res) => {
            dispatch(reviewPosted(res));
        }).catch((e) => console.log(e));
    }
}

export function searchMovies(query) {
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/search`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({ query }),
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        }).then((res) => {
            dispatch(moviesFetched(res.movies));
        }).catch((e) => console.log(e));
    }
}