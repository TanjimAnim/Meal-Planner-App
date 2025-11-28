// src/components/organisms/RecipeDetails.tsx
import { useRecipeDetails } from "../../hooks/useRecipeDetails";

interface Props {
    recipeId: string | null;
    onClose: () => void;
}

export const RecipeDetails = ({ recipeId, onClose }: Props) => {
    const { recipe, loading, error } = useRecipeDetails(recipeId);

    if (!recipeId) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-md p-6 max-w-lg w-full overflow-y-auto max-h-[80vh]">
                <button onClick={onClose} className="mb-4 text-red-600">
                    Close
                </button>

                {loading && <p className="text-black">Loading recipe...</p>}
                {error && <p className="text-red-600">{error}</p>}

                {recipe && (
                    <>
                        <h2 className="text-xl font-bold mb-2 text-black">{recipe.strMeal}</h2>
                        <img
                            src={recipe.strMealThumb}
                            alt={recipe.strMeal}
                            className="w-full h-48 object-cover rounded mb-4"
                        />
                        <p className="text-sm mb-2 text-black">
                            {recipe.strCategory} | {recipe.strArea}
                        </p>
                        <h3 className="font-semibold mt-4 text-black">Ingredients</h3>
                        <ul className="list-disc list-inside text-black">
                            {recipe.ingredients.map((ing, idx) => (
                                <li key={idx}>
                                    {ing.name} - {ing.measure}
                                </li>
                            ))}
                        </ul>
                        <h3 className="font-semibold mt-4">Instructions</h3>
                        <p className="whitespace-pre-line text-black">{recipe.strInstructions}</p>
                    </>
                )}
            </div>
        </div>
    );
};
