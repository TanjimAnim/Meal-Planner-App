export interface RecipeDetails {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    ingredients: Ingredient[];
}

export interface Ingredient {
    name: string;
    measure: string;
}
