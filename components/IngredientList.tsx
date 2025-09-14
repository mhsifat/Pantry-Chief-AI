
import React from 'react';

interface IngredientListProps {
    ingredients: string[];
    onRemoveIngredient: (index: number) => void;
}

export const IngredientList: React.FC<IngredientListProps> = ({ ingredients, onRemoveIngredient }) => {
    if (ingredients.length === 0) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                No ingredients added yet.
            </div>
        );
    }

    return (
        <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 text-sm font-medium px-3 py-1 rounded-full">
                    <span>{ingredient}</span>
                    <button
                        onClick={() => onRemoveIngredient(index)}
                        className="ml-2 text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300 focus:outline-none"
                        aria-label={`Remove ${ingredient}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            ))}
        </div>
    );
};
