import type { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearPlan, removeRecipe } from "../../store/mealPlanSlice";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const WeeklyMealPlan = () => {
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
                                <div className="mx-auto p-2">
                                    <img
                                        src={recipe.strMealThumb}
                                        alt={"recipe-image"}
                                        className="w-20 h-20 mx-auto rounded-sm"
                                    />
                                    <p>{recipe.strMeal}</p>
                                    <button
                                        onClick={() => dispatch(removeRecipe(day))}
                                        className="text-red-600 text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <p>No Recipe Added</p>
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
