import { ShoppingItem } from "@/components/organisms/WeeklyMealPlanModal";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShoppingListState {
    items: ShoppingItem[];
}

const initialState: ShoppingListState = { items: [] };

const shoppingListSlice = createSlice({
    name: "shoppingList",
    initialState,
    reducers: {
        generateList: (state, action: PayloadAction<ShoppingItem[]>) => {
            state.items = action.payload;
        },
        toggleItem: (state, action: PayloadAction<string>) => {
            const item = state.items.find(i => i.name === action.payload);
            if (item) item.purchased = !item.purchased;
        },
        clearCompleted: (state) => {
            state.items = state.items.filter(i => !i.purchased);
        }
    }
});

export const { generateList, toggleItem, clearCompleted } = shoppingListSlice.actions;
export const shoppingListReducer = shoppingListSlice.reducer;
