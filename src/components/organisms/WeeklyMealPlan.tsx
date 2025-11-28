import { generateList } from "@/store/shoppingList";
import type { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearPlan, removeRecipe } from "../../store/mealPlanSlice";
import { ShoppingListDrawer } from "../molecules/ShoppingList"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface ShoppingItem {
    name: string;
    measure: string;
    purchased: boolean;
}

export const WeeklyMealPlan = () => {
    const mealPlan = useAppSelector((state: RootState) => state.mealPlan.plan);
    const dispatch = useAppDispatch();

    const fetchRecipeDetails = async (ids: string[]) => {
        const results = await Promise.all(
            ids.map(id =>
                fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                    .then(res => res.json())
            )
        );

        return results.map(r => r.meals[0]); // each API returns { meals: [...] }
    };

    const handleGenerateList = async () => {
        const recipes = Object.values(mealPlan).filter(Boolean);
        const ids = recipes.map(r => r?.idMeal).filter((id): id is string => id !== undefined);

        const details = await fetchRecipeDetails(ids);

        const items: ShoppingItem[] = [];
        details.forEach(recipe => {
            for (let i = 1; i <= 20; i++) {
                const ingredient = recipe[`strIngredient${i}`];
                const measure = recipe[`strMeasure${i}`];
                if (ingredient && ingredient.trim()) {
                    items.push({ name: ingredient, measure, purchased: false });
                }
            }
        });

        dispatch(generateList(items));
    };

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Weekly Meal Plan</h2>
            <button
                onClick={handleGenerateList}
                className="text-blue-600 text-sm mt-4"
            >
                Generate Shopping List
            </button>
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
            <div className="mt-6">
                <ShoppingListDrawer />
            </div>
        </div>
    );
};
