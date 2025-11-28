// src/hooks/useRecipes.ts
import { useState, useEffect } from "react";

interface Recipe {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strMealThumb: string;
}

export function useRecipes(searchQuery: string, category?: string) {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let abort = false;

        async function fetchRecipes() {
            setLoading(true);
            setError(null);

            try {
                const url =
                    category && category.trim().length > 0
                        ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
                            category
                        )}`
                        : `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
                            searchQuery || ""
                        )}`;

                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);

                const data = await response.json();
                if (!abort) {
                    setRecipes(data.meals || []);
                }
            } catch (err) {
                if (!abort) setError("Failed to fetch recipes");
            } finally {
                if (!abort) setLoading(false);
            }
        }

        // Trigger when either changes
        if ((searchQuery && searchQuery.length > 0) || (category && category.length > 0)) {
            fetchRecipes();
        } else {
            // Empty state: clear results
            setRecipes([]);
        }

        return () => {
            abort = true;
        };
    }, [searchQuery, category]);

    return { recipes, loading, error };
}
