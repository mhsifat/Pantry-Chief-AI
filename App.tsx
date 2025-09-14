
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { IngredientInput } from './components/IngredientInput';
import { IngredientList } from './components/IngredientList';
import { RecipeDisplay } from './components/RecipeDisplay';
import { Footer } from './components/Footer';
import type { Recipe } from './types';
import { getRecipesFromIngredients } from './services/geminiService';

const App: React.FC = () => {
    const [ingredients, setIngredients] = useState<string[]>(['Tomatoes', 'Chicken Breast', 'Garlic']);
    const [recipes, setRecipes] = useState<Recipe[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const addIngredient = useCallback((ingredient: string) => {
        if (ingredient && !ingredients.find(i => i.toLowerCase() === ingredient.toLowerCase())) {
            setIngredients(prev => [...prev, ingredient]);
        }
    }, [ingredients]);

    const removeIngredient = useCallback((indexToRemove: number) => {
        setIngredients(prev => prev.filter((_, index) => index !== indexToRemove));
    }, []);

    const generateRecipes = useCallback(async () => {
        if (ingredients.length === 0) {
            setError('Please add at least one ingredient.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setRecipes(null);

        try {
            const generatedRecipes = await getRecipesFromIngredients(ingredients);
            setRecipes(generatedRecipes);
        } catch (err) {
            console.error(err);
            setError('Failed to generate recipes. Please check your API key and try again.');
        } finally {
            setIsLoading(false);
        }
    }, [ingredients]);

    return (
        <div className="min-h-screen flex flex-col font-sans text-gray-800 dark:text-gray-200">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Ingredients</h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">Add the ingredients you have on hand.</p>
                        </div>
                        <IngredientInput onAddIngredient={addIngredient} />
                        <IngredientList ingredients={ingredients} onRemoveIngredient={removeIngredient} />
                        <button
                            onClick={generateRecipes}
                            disabled={isLoading || ingredients.length === 0}
                            className="w-full flex justify-center items-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            {isLoading ? 'Generating...' : 'Generate Recipes'}
                        </button>
                    </div>

                    <RecipeDisplay recipes={recipes} isLoading={isLoading} error={error} />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default App;
