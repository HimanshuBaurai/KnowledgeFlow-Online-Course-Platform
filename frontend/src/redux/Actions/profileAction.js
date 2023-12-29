import { ServerURL } from "../Store";
import axios from "axios";

export const updateProfile = (name, email) => async (dispatch) => {
    try {
        dispatch({ type: "updateProfileRequest" });

        const { data } = await axios.put(`${ServerURL}/updateprofile`, { name, email }, { withCredentials: true, headers: { "Content-Type": "application/json" } });

        dispatch({ type: "updateProfileSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "updateProfileFail", payload: error.response.data.message });
    }
}

export const changePassword = (oldPassword, newPassword) => async (dispatch) => {
    try {
        dispatch({ type: "changePasswordRequest" });

        const { data } = await axios.put(`${ServerURL}/changepassword`, { oldPassword, newPassword }, { withCredentials: true, headers: { "Content-Type": "application/json" } });

        dispatch({ type: "changePasswordSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "changePasswordFail", payload: error.response.data.message });
    }
}

export const updateProfilePicture = (formdata) => async (dispatch) => {
    try {
        dispatch({ type: "updateProfilePictureRequest" });

        const { data } = await axios.put(`${ServerURL}/updateprofilepic`, formdata, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true });

        dispatch({ type: "updateProfilePictureSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "updateProfilePictureFail", payload: error.response.data.message });
    }
}