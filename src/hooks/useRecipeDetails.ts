
import { useState, useEffect } from "react";
import type { Ingredient, RecipeDetails } from "../types/RecipeDetails";


export function useRecipeDetails(id: string | null) {
    const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        let abort = false;

        async function fetchDetails() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
                );
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();

                if (!abort && data.meals && data.meals.length > 0) {
                    const meal = data.meals[0];

                    // Extract ingredients dynamically
                    const ingredients: Ingredient[] = [];
                    for (let i = 1; i <= 20; i++) {
                        const name = meal[`strIngredient${i}`];
                        const measure = meal[`strMeasure${i}`];
                        if (name && name.trim() !== "") {
                            ingredients.push({ name, measure });
                        }
                    }

                    setRecipe({
                        idMeal: meal.idMeal,
                        strMeal: meal.strMeal,
                        strCategory: meal.strCategory,
                        strArea: meal.strArea,
                        strInstructions: meal.strInstructions,
                        strMealThumb: meal.strMealThumb,
                        ingredients,
                    });
                }
            } catch (err) {
                if (!abort) setError("Failed to fetch recipe details");
            } finally {
                if (!abort) setLoading(false);
            }
        }

        fetchDetails();
        return () => {
            abort = true;
        };
    }, [id]);

    return { recipe, loading, error };
}
