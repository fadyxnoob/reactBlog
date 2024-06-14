import {configureStore} from '@reduxjs/toolkit'
import authReducer from './AuthSlice'


const store = configureStore({
    reducer: {
        auth: authReducer,
        // TODO add moreSlice here for Post
    }
});

export default store;