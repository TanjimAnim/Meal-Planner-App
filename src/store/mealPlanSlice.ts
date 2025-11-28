// src/store/mealPlanSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { RecipeDetails } from "../types/RecipeDetails";
import type { PayloadAction } from "@reduxjs/toolkit";

interface MealPlanState {
    plan: Record<string, RecipeDetails | null>;
}

const initialState: MealPlanState = {
    plan: {},
};

const mealPlanSlice = createSlice({
    name: "mealPlan",
    initialState,
    reducers: {
        addRecipe: (
            state,
            action: PayloadAction<{ day: string; recipe: RecipeDetails }>
        ) => {
            state.plan[action.payload.day] = action.payload.recipe;
        },
        removeRecipe: (state, action: PayloadAction<string>) => {
            state.plan[action.payload] = null;
        },
        clearPlan: (state) => {
            state.plan = {};
        },
    },
});

export const { addRecipe, removeRecipe, clearPlan } = mealPlanSlice.actions;
export const mealPlanReducer = mealPlanSlice.reducer;
