const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strYoutube: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  [key: string]: any;
}

export interface RecipeResponse {
  meals: Recipe[] | null;
}

export const recipesApi = {
  searchRecipes: async (query: string): Promise<Recipe[]> => {
    try {
      const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`Recipe API error: ${response.status}`);
      }
      
      const data: RecipeResponse = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error('Error fetching recipes:', error);
      return [];
    }
  },

  getRecipesByCategory: async (category: string): Promise<Recipe[]> => {
    try {
      const response = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
      
      if (!response.ok) {
        throw new Error(`Recipe API error: ${response.status}`);
      }
      
      const data: RecipeResponse = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error('Error fetching recipes by category:', error);
      return [];
    }
  },

  getRecipeDetails: async (id: string): Promise<Recipe | null> => {
    try {
      const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
      
      if (!response.ok) {
        throw new Error(`Recipe API error: ${response.status}`);
      }
      
      const data: RecipeResponse = await response.json();
      return data.meals?.[0] || null;
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      return null;
    }
  }
};