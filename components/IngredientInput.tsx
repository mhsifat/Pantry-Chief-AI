
import React, { useState } from 'react';

interface IngredientInputProps {
    onAddIngredient: (ingredient: string) => void;
}

export const IngredientInput: React.FC<IngredientInputProps> = ({ onAddIngredient }) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (value.trim()) {
            onAddIngredient(value.trim());
            setValue('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g., chicken, rice, carrots"
                className="flex-grow w-full px-4 py-2 text-gray-800 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow"
            />
            <button
                type="submit"
                className="bg-indigo-500 text-white font-semibold px-5 py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors"
            >
                Add
            </button>
        </form>
    );
};
