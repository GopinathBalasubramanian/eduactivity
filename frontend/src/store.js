import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import searchReducer from './features/searchSlice';
import providersReducer from './features/providersSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    providers: providersReducer,
  },
});
