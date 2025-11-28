// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { mealPlanReducer } from "./mealPlanSlice";

export const store = configureStore({
    reducer: {
        mealPlan: mealPlanReducer,
    },
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;