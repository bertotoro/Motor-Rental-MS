import axios from "axios";
import { message } from 'antd';

// Action to fetch all users
export const getAllUsers = () => async dispatch => {
    dispatch({ type: 'GET_ALL_USERS_REQUEST' });

    try {
        const response = await axios.get('/api/users/userlist');
        dispatch({ type: 'GET_ALL_USERS_SUCCESS', payload: response.data });
    } catch (error) {
        console.log(error);
        message.error('Failed to fetch users');
        dispatch({ type: 'GET_ALL_USERS_FAILURE', payload: error.message });
    }
}

// Action to delete a user by ID
export const deleteUser = (userId) => async dispatch => {
    try {
        await axios.delete(`/api/users/${userId}`);
        message.success('User deleted successfully');
        dispatch({ type: 'DELETE_USER', payload: userId }); // Dispatch DELETE_USER action with userId payload
    } catch (error) {
        console.log(error);
        message.error('Failed to delete user');
    }
}

// Action to update user role
export const updateUserRole = (userId, newRole) => async dispatch => {
    try {
        await axios.put(`/api/users/${userId}/role`, { newRole });
        message.success('User role updated successfully');
        dispatch(getAllUsers()); // Refresh the user list
    } catch (error) {
        console.log(error);
        message.error('Failed to update user role');
    }
}

// Action to update user password
export const updateUserPassword = (userId, newPassword) => async dispatch => {
    try {
        await axios.put(`/api/users/${userId}/password`, { newPassword });
        message.success('Password updated successfully');
    } catch (error) {
        console.log(error);
        message.error('Failed to update password');
    }
}

// Action to login user
export const userLogin = (reqObj) => async dispatch => {
    try {
        const response = await axios.post('/api/users/login', reqObj);
        localStorage.setItem('user', JSON.stringify(response.data));
        message.success('Login successful');
        setTimeout(() => {
            window.location.href = '/';
        }, 500);
    } catch (error) {
        console.log(error);
        message.error('Invalid credentials');
    }
}

// Action to register user
export const userRegister = (reqObj) => async dispatch => {
    try {
        await axios.post('/api/users/register', reqObj);
        message.success('Registration successful');
        setTimeout(() => {
            window.location.href = '/login';
        }, 500);
    } catch (error) {
        console.log(error);
        message.error('Registration failed');
    }
}

// Action to update user credentials (username and password)
export const updateUserCredentials = (userId, newUsername, newPassword) => async dispatch => {
    try {
        await axios.put(`/api/users/${userId}`, { newUsername, newPassword });
        message.success('User credentials updated successfully');
        dispatch(getAllUsers()); // Refresh the user list
    } catch (error) {
        console.log(error);
        message.error('Failed to update user credentials');
    }
}