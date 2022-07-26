import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import User from './reducer/User';

// 삭당에다가 접시 등록하기
export default configureStore({
    reducer: {
        user: User,
    },
});