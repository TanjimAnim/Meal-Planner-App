// src/components/organisms/WeeklyMealPlan.tsx
import type { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearPlan, removeRecipe } from "../../store/mealPlanSlice";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface WeeklyMealPlanType {
    onSelectDay: (day: string) => void;
}

export const WeeklyMealPlan = ({ onSelectDay }: WeeklyMealPlanType) => {
    const mealPlan = useAppSelector((state: RootState) => state.mealPlan.plan);
    const dispatch = useAppDispatch();

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Weekly Meal Plan</h2>
            <div className="grid grid-cols-2 gap-4">
                {days.map((day) => {
                    const recipe = mealPlan[day];
                    return (
                        <div key={day} className="border rounded p-2">
                            <h3 className="font-semibold">{day}</h3>
                            {recipe ? (
                                <div>
                                    <p>{recipe.strMeal}</p>
                                    <button
                                        onClick={() => dispatch(removeRecipe(day))}
                                        className="text-red-600 text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => onSelectDay(day)}
                                    className="text-blue-600 text-sm"
                                >
                                    Add Recipe
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
            <button
                onClick={() => dispatch(clearPlan())}
                className="text-gray-600 text-sm mt-4"
            >
                Clear All
            </button>
        </div>
    );
};
