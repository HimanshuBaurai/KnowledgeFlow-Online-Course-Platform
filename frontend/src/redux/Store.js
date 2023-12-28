import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './Reducers/userReducer';

const store = configureStore({
    reducer: {
        user:userReducer,
    },
})

export default store;
export const ServerURL = "https://knowledge-flow-online-course-platform.vercel.app/api/v1";