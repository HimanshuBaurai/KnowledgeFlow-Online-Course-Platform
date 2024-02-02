import { ServerURL } from "../Store";
import axios from "axios";

export const contactUs = (name, email, message) => async dispatch => {
    try {
        dispatch({ type: "contactRequest" });

        const config = {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            }
        }

        const { data } = await axios.post(`${ServerURL}/contact`, { name, email, message }, config);

        dispatch({ type: "contactSuccess", payload: data.message });

    } catch (error) {
        dispatch({ type: "contactFail", payload: error.response.data.message });
    }
};

export const courseRequest = (name, email, course) => async dispatch => {
    try {
        dispatch({ type: "courseRequest" });

        const config = {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            }
        }

        const { data } = await axios.post(`${ServerURL}/courserequest`, { name, email, course }, config);

        dispatch({ type: "courseSuccess", payload: data.message });

    } catch (error) {
        dispatch({ type: "courseFail", payload: error.response.data.message });
    }
};