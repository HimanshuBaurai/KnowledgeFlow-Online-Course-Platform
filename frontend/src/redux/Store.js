import { configureStore } from '@reduxjs/toolkit';
import { profileReducer, subscriptionReducer, userReducer } from './Reducers/userReducer';
import { courseReducer } from './Reducers/courseReducer';
import { adminReducer } from './Reducers/adminReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        course: courseReducer,
        subscription: subscriptionReducer,
        admin: adminReducer,
    },
})

export default store;
// export const ServerURL = "https://knowledge-flow-online-course-platform.vercel.app/api/v1";
export const ServerURL = "https://knowledgeflow-server.onrender.com/api/v1";