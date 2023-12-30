import { ServerURL } from "../Store";
import axios from "axios";

export const getAllCourses = (category = "", keyword = "") => async (dispatch) => {
    try {
        dispatch({ type: "allCoursesRequest" });

        const { data } = await axios.get(`${ServerURL}/courses?keyword=${keyword}&category=${category}`);
        dispatch({ type: "allCoursesSuccess", payload: data.courses });
    } catch (error) {
        dispatch({ type: "allCoursesFail", payload: error.response.data.message });
    }
}