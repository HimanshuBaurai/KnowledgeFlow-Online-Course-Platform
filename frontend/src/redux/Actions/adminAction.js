import { ServerURL } from "../Store";
import axios from "axios";


export const createCourse = (formData) => async (dispatch) => {
    try {
        dispatch({ type: "createCourseRequest" });

        const { data } = await axios.post(`${ServerURL}/createcourse`, formData, { withCredentials: true }, { headers: { 'Content-Type': 'multipart/form-data' } });
        dispatch({ type: "createCourseSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "createCourseFail", payload: error.response.data.message });
    }
}

export const deleteCourse = (courseId) => async (dispatch) => {
    try {
        dispatch({ type: "deleteCourseRequest" });

        const { data } = await axios.delete(`${ServerURL}/course/${courseId}`, { withCredentials: true });
        dispatch({ type: "deleteCourseSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "deleteCourseFail", payload: error.response.data.message });
    }
}


export const addLecture = (id, formdata) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
            },
            withCredentials: true,
        };
        dispatch({ type: 'addLectureRequest' });

        const { data } = await axios.post(
            `${ServerURL}/course/${id}`,
            formdata,
            config
        );

        dispatch({ type: 'addLectureSuccess', payload: data.message });
    } catch (error) {
        dispatch({
            type: 'addLectureFail',
            payload: error.response.data.message,
        });
    }
};


export const deleteLecture = (courseId, lectureId) => async dispatch => {
    try {
        dispatch({ type: 'deleteLectureRequest' });

        const { data } = await axios.delete(
            `${ServerURL}/lecture?courseId=${courseId}&lectureId=${lectureId}`,
            { withCredentials: true }
        );

        dispatch({ type: 'deleteLectureSuccess', payload: data.message });
    } catch (error) {
        dispatch({
            type: 'deleteLectureFail',
            payload: error.response.data.message,
        });
    }
};

export const getAllUsers = () => async dispatch => {
    try {
        dispatch({ type: 'getAllUsersRequest' });

        const { data } = await axios.get(`${ServerURL}/admin/users`, { withCredentials: true });

        dispatch({ type: 'getAllUsersSuccess', payload: data.users });
    } catch (error) {
        dispatch({
            type: 'getAllUsersFail',
            payload: error.response.data.message,
        });
    }
}

export const deleteUser = (id) => async dispatch => {
    try {
        dispatch({ type: 'deleteUserRequest' });

        const { data } = await axios.delete(`${ServerURL}/admin/user/${id}`, { withCredentials: true });

        dispatch({ type: 'deleteUserSuccess', payload: data.message });
    } catch (error) {
        dispatch({
            type: 'deleteUserFail',
            payload: error.response.data.message,
        });
    }
}

export const updateUserRole = (id) => async dispatch => {
    try {
        dispatch({ type: 'updateUserRoleRequest' });

        const { data } = await axios.put(`${ServerURL}/admin/user/${id}`, {}, { withCredentials: true });

        dispatch({ type: 'updateUserRoleSuccess', payload: data.message });
    } catch (error) {
        dispatch({
            type: 'updateUserRoleFail',
            payload: error.response.data.message,
        });
    }
}