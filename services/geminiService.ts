import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';
import { GEMINI_MODEL_NAME } from '../constants';

const recipeSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: { 
        type: Type.STRING, 
        description: 'The name of the recipe.' 
      },
      description: { 
        type: Type.STRING, 
        description: 'A short, enticing description of the dish.' 
      },
      ingredients: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'A list of all ingredients required for the recipe, including quantities.'
      },
      instructions: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'Step-by-step cooking instructions.'
      },
      prepTime: { 
        type: Type.STRING, 
        description: 'Preparation time, e.g., "15 minutes".' 
      },
      cookTime: { 
        type: Type.STRING, 
        description: 'Cooking time, e.g., "30 minutes".' 
      },
    },
    required: ['name', 'description', 'ingredients', 'instructions', 'prepTime', 'cookTime']
  }
};

const generateImage = async (ai: GoogleGenAI, prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: `A professional, high-quality, delicious-looking photo of ${prompt}, food photography style.`,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '16:9',
        },
    });

    const base64ImageBytes = response.generatedImages[0]?.image.imageBytes;
    if (!base64ImageBytes) {
      throw new Error("No image bytes returned from API.");
    }
    return `data:image/jpeg;base64,${base64ImageBytes}`;
  } catch (error) {
    console.error(`Error generating image for prompt "${prompt}":`, error);
    return ''; 
  }
};


export const getRecipesFromIngredients = async (ingredients: string[]): Promise<Recipe[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `You are a world-class chef. Based on the following ingredients, generate 3 diverse and delicious recipes. The user has these ingredients available: ${ingredients.join(', ')}. 
  You can assume the user has basic pantry staples like salt, pepper, water, and cooking oil. 
  For each recipe, provide a detailed response. The response must be in JSON format and adhere to the provided schema.`;

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    const responseText = response.text.trim();
    if (!responseText) {
      throw new Error("Received an empty response from the API.");
    }
    
    const textRecipes: Omit<Recipe, 'imageUrl'>[] = JSON.parse(responseText);

    const recipesWithImages = await Promise.all(
        textRecipes.map(async (recipe) => {
            const imageUrl = await generateImage(ai, recipe.name);
            return {
                ...recipe,
                imageUrl,
            };
        })
    );

    return recipesWithImages;

  } catch (error) {
    console.error("Error generating recipes:", error);
    throw new Error("Could not parse recipes from the Gemini API response.");
  }
};