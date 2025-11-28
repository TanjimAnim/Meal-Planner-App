// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { mealPlanReducer } from "./mealPlanSlice";
import { shoppingListReducer } from "./shoppingList"

export const store = configureStore({
    reducer: {
        mealPlan: mealPlanReducer,
        shoppingList: shoppingListReducer
    },
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;