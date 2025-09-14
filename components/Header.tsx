
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="py-6 bg-white dark:bg-gray-800 shadow-md">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                    Pantry Chef AI
                </h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                    Turn your ingredients into culinary masterpieces.
                </p>
            </div>
        </header>
    );
};
