import { useEffect, useState } from "react";
import { MealCategory } from "../types/api";

export default function useRecipeCategories() {
    const [categories, setCategories] = useState<MealCategory[]>([]);
    const [categoryLoading, setCategoryLoading] = useState(false);
    const [categoryError, setCategoryError] = useState<string | null>(null);

    useEffect(() => {
        let abort = false;

        async function fetchCategories() {
            setCategoryLoading(true);
            setCategoryError(null);
            try {
                const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                if (!abort) {
                    setCategories(data.categories || []);
                }
            } catch (e) {
                if (!abort) setCategoryError("Failed to load categories");
            } finally {
                if (!abort) setCategoryLoading(false);
            }
        }

        fetchCategories();
        return () => {
            abort = true;
        };
    }, []);
    return {
        categories,
        categoryError,
        categoryLoading
    }
}