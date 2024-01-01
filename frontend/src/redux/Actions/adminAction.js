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