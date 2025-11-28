// src/components/organisms/SearchBar.tsx
import React from "react";
import { Input } from "../atoms/Input/Input";
import { Select } from "../atoms/Select/Select";
import { useRecipes } from "../../hooks/useRecipes";
import type { MealCategory } from "../../types/api";
import { RecipeDetails } from "./RecipeDetails";

export const SearchBar: React.FC = () => {
    const [query, setQuery] = React.useState("");
    const [category, setCategory] = React.useState<string>("");
    const [categories, setCategories] = React.useState<MealCategory[]>([]);
    const [catLoading, setCatLoading] = React.useState(false);
    const [catError, setCatError] = React.useState<string | null>(null);
    const [selectedId, setSelectedId] = React.useState<string | null>(null);

    const { recipes, loading, error } = useRecipes(query, category);

    // Fetch categories for dropdown
    React.useEffect(() => {
        let abort = false;

        async function fetchCategories() {
            setCatLoading(true);
            setCatError(null);
            try {
                const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                if (!abort) {
                    setCategories(data.categories || []);
                }
            } catch (e) {
                if (!abort) setCatError("Failed to load categories");
            } finally {
                if (!abort) setCatLoading(false);
            }
        }

        fetchCategories();
        return () => {
            abort = true;
        };
    }, []);

    const categoryOptions = categories.map((c) => ({
        value: c.strCategory,
        label: c.strCategory,
    }));

    return (
        <>
            <div className="flex flex-col gap-4 max-w-2xl mx-auto">
                {/* Search input */}
                <Input
                    type="search"
                    placeholder="Search recipes..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                {/* Category dropdown atom */}
                <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    options={categoryOptions}
                    placeholder="All categories"
                />

                {/* Loading states */}
                {catLoading && <p>Loading categories...</p>}
                {catError && <p>{catError}</p>}

                {loading && <p>Loading recipes...</p>}
                {error && <p>{error}</p>}

                {/* Results */}
                <div className="grid md:grid-cols-2 w-full max-w-7xl gap-4">
                    {recipes.map((recipe) => (
                        <div
                            key={recipe.idMeal}
                            className="border rounded p-2"
                            onClick={() => setSelectedId(recipe.idMeal)}
                        >
                            <img
                                src={recipe.strMealThumb}
                                alt={recipe.strMeal}
                                className="w-full h-32 object-cover rounded"

                            />
                            <p className="mt-2 font-semibold">{recipe.strMeal}</p>
                            <span className="text-sm text-gray-600">{recipe.strCategory}</span>
                        </div>
                    ))}
                </div>

            </div>
            {selectedId && (
                <RecipeDetails recipeId={selectedId} onClose={() => setSelectedId(null)} />
            )}
        </>
    );
};
