import axios from 'axios'

export function loginUser (body) {
    const request = axios.post('/login', body);

    return {
        type: 'LOGIN_USER',
        payload: request
    }
}