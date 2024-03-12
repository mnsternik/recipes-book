import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Recipe } from "./recipe.model";

@Injectable({ providedIn: 'root' })
export class LocalRecipceService {

    private recipes: Recipe[] = [];
    tagOptions = [
        "Vegan",
        "Spicy",
        "Gluten-free",
        "Low-carb",
        "Mediterranean",
        "Keto-friendly",
        "Quick & Easy",
        "Comfort Food",
        "Paleo",
        "Dairy-free",
        "Asian-inspired",
        "Family-friendly"
    ];
    
    recipesChanged = new Subject<Recipe[]>; 

    getRecipes() {
        return structuredClone(this.recipes);
    }

    getRecipe(id: string) {
        const recipeIndex = this.recipes.findIndex(recipe => recipe.id === id); 
        return structuredClone(this.recipes)[recipeIndex];
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes; 
        this.recipesChanged.next(structuredClone(this.recipes));
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe); 
        this.recipesChanged.next(structuredClone(this.recipes));
    }

    updateRecipe(id: string, recipe: Recipe) {
        const updatedRecipeIndex = this.recipes.findIndex(recipe => recipe.id === id); 
        this.recipes[updatedRecipeIndex] = recipe; 
        this.recipesChanged.next(structuredClone(this.recipes));
    }

    removeRecipe(id: string) {
        const removedRecipeIndex = this.recipes.findIndex(recipe => recipe.id === id); 
        this.recipes.splice(removedRecipeIndex, 1); 
        this.recipesChanged.next(structuredClone(this.recipes));
    }
}