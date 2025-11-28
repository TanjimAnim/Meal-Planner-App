import { useAppDispatch } from "@/store/hooks";
import { useState } from "react";
import { useRecipeDetails } from "../../hooks/useRecipeDetails";
import ErrorComponent from "../atoms/ErrorComponent/ErrorComponent";
import { Select, SelectOption } from "../atoms/Select/Select";
import { addRecipe } from "@/store/mealPlanSlice";
import { CgCloseO } from "react-icons/cg";
interface Props {
    recipeId: string | null;
    onClose: () => void;
}

export const RecipeDetails = ({ recipeId, onClose }: Props) => {
    const { recipe, loading, error } = useRecipeDetails(recipeId);
    const dispatch = useAppDispatch()
    const [day, setDay] = useState<string>("");

    const daysOfWeek: SelectOption[] = [
        { value: "Monday", label: "Monday" },
        { value: "Tuesday", label: "Tuesday" },
        { value: "Wednesday", label: "Wednesday" },
        { value: "Thursday", label: "Thursday" },
        { value: "Friday", label: "Friday" },
        { value: "Saturday", label: "Saturday" },
        { value: "Sunday", label: "Sunday" },
    ];

    if (!recipeId) return <ErrorComponent error="No Recipe Details Found" />;

    return (
        <div className="fixed inset-0 bg-blue-300/30 flex items-center justify-center">
            <div className="bg-white rounded-md p-6 max-w-4xl w-full overflow-y-auto max-h-[80vh] relative">
                <CgCloseO onClick={onClose} size={20} className="mb-4 text-red-600 absolute top-2 right-4" />


                {loading && <p className="text-black">Loading recipe...</p>}
                {error && <p className="text-red-600">{error}</p>}

                {recipe && (
                    <>
                        <h2 className="text-left text-xl md:text-2xl font-bold mb-2 text-black">{recipe.strMeal}</h2>
                        <p className="text-left text-sm mb-2 text-gray-400">
                            {recipe.strCategory} | {recipe.strArea}
                        </p>
                        <img
                            src={recipe.strMealThumb}
                            alt={recipe.strMeal}
                            className="w-full h-60 object-cover rounded-md mb-4"
                        />
                        <div className="flex items-start gap-2 justify-between mt-2">
                            <div className="text-left">
                                <h3 className="font-semibold text-black text-base md:text-xl">Ingredients</h3>
                                <ul className="list-disc list-inside text-black">
                                    {recipe.ingredients.map((ing, idx) => (
                                        <li key={idx}>
                                            {ing.name} - {ing.measure}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                    {/* <label className="block mb-2 text-black font-semibold">
                                        Select Day:
                                    </label> */}
                                    <Select
                                        id="day-select"
                                        name="day"
                                        value={day}
                                        onChange={(e) => setDay(e.target.value)}
                                        options={daysOfWeek}
                                        placeholder="Choose a day"
                                        className="border rounded p-2 w-full text-black border-[#d3d3d3]"
                                        required
                                    />
                                </div>
                                <button
                                    disabled={!day || !recipe}
                                    onClick={() => {
                                        if (recipe && day) {
                                            dispatch(addRecipe({ day, recipe }));
                                            onClose();
                                        }
                                    }}
                                    className="bg-blue-600 text-white p-3 rounded disabled:opacity-50 min-w-[200px] max-[200px]"
                                >
                                    Add to {day || "Day"}
                                </button>
                            </div>
                        </div>
                        <div className="text-left">
                            <h3 className="font-semibold mt-4 text-base md:text-xl">Instructions</h3>
                            <p className="whitespace-pre-line text-black h-30 overflow-auto">{recipe.strInstructions}</p>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
};
