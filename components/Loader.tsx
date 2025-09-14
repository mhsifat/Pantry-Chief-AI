import React from 'react';

export const Loader: React.FC = () => {
    return (
        <div className="text-center py-12" aria-label="Loading recipes">
            <div className="flex justify-center items-center space-x-2">
                <div className="w-4 h-4 rounded-full animate-pulse bg-indigo-500"></div>
                <div className="w-4 h-4 rounded-full animate-pulse bg-indigo-500" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-4 h-4 rounded-full animate-pulse bg-indigo-500" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
                Generating recipes & images...
            </p>
            <p className="text-gray-500 dark:text-gray-400">This may take a moment.</p>
        </div>
    );
};