import { Subject } from "rxjs";
import { Recipe } from "./recipe.model";

export class RecipceService {

    private recipes: Recipe[] = [];
    
    recipesChanged = new Subject<Recipe[]>; 

    getRecipes() {
        return structuredClone(this.recipes);
    }

    getRecipe(index: number) {
        return structuredClone(this.recipes)[index];
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes; 
        this.recipesChanged.next(structuredClone(this.recipes));
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe); 
        this.recipesChanged.next(structuredClone(this.recipes));
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe; 
        this.recipesChanged.next(structuredClone(this.recipes));
    }

    removeRecipe(index: number) {
        this.recipes.splice(index, 1); 
        this.recipesChanged.next(structuredClone(this.recipes));
    }
}