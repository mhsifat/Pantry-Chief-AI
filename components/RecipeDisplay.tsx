
import React from 'react';
import type { Recipe } from '../types';
import { RecipeCard } from './RecipeCard';
import { Loader } from './Loader';
import { ErrorMessage } from './ErrorMessage';

interface RecipeDisplayProps {
    recipes: Recipe[] | null;
    isLoading: boolean;
    error: string | null;
}

export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipes, isLoading, error }) => {
    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (!recipes) {
        return (
            <div className="text-center py-12">
                <div className="inline-block bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0c-.454-.303-.977-.454-1.5-.454V12a1 1 0 011-1h12a1 1 0 011 1v3.546zM21 21a2 2 0 01-2 2H5a2 2 0 01-2-2v-9a2 2 0 012-2h14a2 2 0 012 2v9zM15 7a1 1 0 01-1-1V5a1 1 0 012 0v1a1 1 0 01-1 1zm-5 0a1 1 0 01-1-1V5a1 1 0 012 0v1a1 1 0 01-1 1z" />
                    </svg>
                    <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">Ready to Cook?</h3>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">Your generated recipes will appear here.</p>
                </div>
            </div>
        );
    }
    
    if (recipes.length === 0) {
        return <ErrorMessage message="No recipes could be generated for the given ingredients." />;
    }

    return (
        <div className="mt-12">
            <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-900 dark:text-white">Your Culinary Creations</h2>
            <div className="grid grid-cols-1 gap-8">
                {recipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                ))}
            </div>
        </div>
    );
};
