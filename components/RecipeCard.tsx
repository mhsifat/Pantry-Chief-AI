import React from 'react';
import type { Recipe } from '../types';

interface RecipeCardProps {
    recipe: Recipe;
}

const InfoPill: React.FC<{ icon: JSX.Element; label: string }> = ({ icon, label }) => (
    <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 text-sm text-gray-700 dark:text-gray-300">
        {icon}
        <span className="ml-2">{label}</span>
    </div>
);

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            {recipe.imageUrl && (
                <img 
                    src={recipe.imageUrl} 
                    alt={`A photo of ${recipe.name}`} 
                    className="w-full h-56 object-cover" 
                    aria-label={`Preview image of ${recipe.name}`}
                />
            )}
            <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{recipe.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{recipe.description}</p>
                
                <div className="flex flex-wrap gap-3 mb-6">
                    <InfoPill 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        label={`Prep: ${recipe.prepTime}`}
                    />
                     <InfoPill 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0117.657 18.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1014.12 11.88l-4.242 4.242z" /></svg>}
                        label={`Cook: ${recipe.cookTime}`}
                    />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">Ingredients</h4>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                            {recipe.ingredients.map((item, i) => (
                                <li key={i} className="flex items-start">
                                    <svg className="h-4 w-4 mt-1 mr-2 text-indigo-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                     <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">Instructions</h4>
                        <ol className="space-y-3 text-gray-600 dark:text-gray-400 list-inside">
                            {recipe.instructions.map((step, i) => (
                                <li key={i} className="flex items-start">
                                    <span className="flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 font-bold text-xs mr-3 flex-shrink-0">{i + 1}</span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};