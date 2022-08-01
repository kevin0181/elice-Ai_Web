import { configureStore } from "@reduxjs/toolkit";
import Data from "./reducer/Data";

//slice -> store
export default configureStore({
    reducer: {
        id: Data
    }
});