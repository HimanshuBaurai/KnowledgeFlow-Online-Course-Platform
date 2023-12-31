import { ServerURL } from "../Store";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: "loginRequest" });

        const { data } = await axios.post(`${ServerURL}/login`, { email, password }, { withCredentials: true, headers: { "Content-Type": "application/json" } });

        dispatch({ type: "loginSuccess", payload: data });
        // localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({ type: "loginFail", payload: error.response.data.message });
    }
};


export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: 'loadUserRequest' });

        const { data } = await axios.get(`${ServerURL}/me`, { withCredentials: true });
        dispatch({ type: 'loadUserSuccess', payload: data.user });
    }
    catch (error) {
        dispatch({ type: 'loadUserFail', payload: error.response.data.message });
    }
};


export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: 'logoutRequest' });

        const { data } = await axios.get(`${ServerURL}/logout`, { withCredentials: true });
        dispatch({ type: 'clearUserData' });
        dispatch({ type: 'logoutSuccess', payload: data.message });
    }
    catch (error) {
        dispatch({ type: 'logoutFail', payload: error.response.data.message });
    }
}

export const register = (formdata) => async (dispatch) => {
    try {
        dispatch({ type: 'registerRequest' });

        const { data } = await axios.post(`${ServerURL}/register`, formdata, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } });
        dispatch({ type: 'registerSuccess', payload: data });
    }
    catch (error) {
        dispatch({ type: 'registerFail', payload: error.response.data.message });
    }
}

//subscription related actions
export const buySubscription = () => async (dispatch) => {
    try {
        dispatch({ type: 'buySubscriptionRequest' });

        const { data } = await axios.get(`${ServerURL}/subscribe`, { withCredentials: true });
        dispatch({ type: 'buySubscriptionSuccess', payload: data.subscriptionId });
    }
    catch (error) {
        dispatch({ type: 'buySubscriptionFail', payload: error.response.data.message });
    }
}

export const cancelSubscription = () => async (dispatch) => {
    try {
        dispatch({ type: 'cancelSubscriptionRequest' });

        const { data } = await axios.delete(`${ServerURL}/subscribe/cancel`, { withCredentials: true });
        dispatch({ type: 'cancelSubscriptionSuccess', payload: data.message });
    }
    catch (error) {
        dispatch({ type: 'cancelSubscriptionFail', payload: error.response.data.message });
    }
}