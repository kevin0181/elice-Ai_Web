import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import Data from './reducer/Data';

// 삭당에다가 접시 등록하기
export default configureStore({
    reducer: {
        user: Data,
    },
});