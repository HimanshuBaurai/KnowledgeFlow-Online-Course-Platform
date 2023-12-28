import { ServerURL } from "../Store";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: "loginRequest" });

        const { data } = await axios.post(`${ServerURL}/login`, { email, password }, { withCredentials: true }, { headers: { "Content-Type": "application/json" } });

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
}