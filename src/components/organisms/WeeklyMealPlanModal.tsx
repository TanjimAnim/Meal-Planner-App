import { generateList } from "@/store/shoppingList";
import type { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearPlan, removeRecipe } from "../../store/mealPlanSlice";
import { Modal } from "../molecules/Modal";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export interface ShoppingItem {
    name: string;
    measure: string;
    purchased: boolean;
}

type WeeklyPlanModalTypes = {
    open: boolean
    onClose: () => void
}

export const WeeklyMealPlanModal = ({ onClose, open }: WeeklyPlanModalTypes) => {
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
        <Modal onClose={onClose} open={open}>
            <div className="flex flex-col gap-4 font-poppins">
                <h2 className="text-xl md:text-2xl font-bold">Weekly Meal Plan</h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleGenerateList}
                        className="w-1/2 text-blue-600 border border-blue-600 bg-white hover:bg-gray-200 transition-[background] text-sm"
                    >
                        Generate Shopping List
                    </button>
                    <button
                        onClick={() => dispatch(clearPlan())}
                        className="w-1/2 border border-red-500 text-red-500 bg-white hover:bg-gray-200 transition-[background] text-sm"
                    >
                        Clear All
                    </button>
                </div>
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

            </div>
        </Modal>
    );
};
