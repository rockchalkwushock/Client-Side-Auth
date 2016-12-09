import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_ERROR, AUTH_USER } from './types';

const API_URL = 'http://localhost:3000';

export function signinUser({ email, password }) {
  return function(dispatch) { // redux-thunk allows for the return of a function.
    // Submit email/password to the server
    axios.post(`${API_URL}/signin`, { email, password })
         .then(response => {
           // If request is good...
           // - Update state to indicate user is authenticated
           dispatch({ type: AUTH_USER });
           // - Save the JWT token
           localStorage.setItem('token', response.data.token);
           // - redirect to the route '/feature'
           browserHistory.push('/feature');
         })
         .catch(() => {
           // If request is bad...
           // - Show an error to the user
           dispatch(authError('Bad Login Info'));
         });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}
