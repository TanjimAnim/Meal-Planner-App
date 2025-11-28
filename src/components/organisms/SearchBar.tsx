import useRecipeCategories from "@/hooks/useRecipeCategories";
import React, { ChangeEvent, useEffect } from "react";
import { useRecipes } from "../../hooks/useRecipes";
import { Input } from "../atoms/Input/Input";
import RecipeCard from "../atoms/RecipeCard/RecipeCard";
import { Select } from "../atoms/Select/Select";
import { RecipeDetails } from "./RecipeDetails";

export const SearchBar: React.FC = () => {
    const [query, setQuery] = React.useState("");
    const [debouncedQuery, setDebouncedQuery] = React.useState(query);
    const [category, setCategory] = React.useState<string>("");
    const [selectedId, setSelectedId] = React.useState<string | null>(null);

    const { recipes, loading, error } = useRecipes(debouncedQuery, category);
    const { categories, categoryError, categoryLoading } = useRecipeCategories()


    const categoryOptions = categories.map((c) => ({
        value: c.strCategory,
        label: c.strCategory,
    }));

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => clearTimeout(handler);
    }, [query]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    return (
        <>
            <div className="mt-2 flex flex-col gap-4 w-full mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-2">
                    <Input
                        type="search"
                        placeholder="Search for recipes..."
                        value={query}
                        onChange={handleChange}
                    />

                    {/* Category dropdown atom */}
                    <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        options={categoryOptions}
                        placeholder="Select Category"
                        className="border border-[#d3d3d3] p-2 rounded-md w-full md:w-fit"
                    />
                </div>
                {/* Search input */}

                {/* Loading states */}
                {categoryLoading && <p>Loading categories...</p>}
                {categoryError && <p>{categoryError}</p>}

                {loading && <p>Loading recipes...</p>}
                {error && <p>{error}</p>}

                {/* Results */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-7xl gap-4">
                    {recipes.map((recipe) => (
                        <RecipeCard
                            category={recipe.strCategory}
                            imageSrc={recipe.strMealThumb}
                            onClick={() => setSelectedId(recipe.idMeal)}
                            title={recipe.strMeal}
                            key={recipe.idMeal}
                        />
                    ))}
                </div>

            </div>
            {selectedId && (
                <RecipeDetails recipeId={selectedId} onClose={() => setSelectedId(null)} />
            )}
        </>
    );
};
