import { Subject } from "rxjs";
import { Recipe } from "./recipe.model";

export class RecipceService {
    private recipes: Recipe[] = [
        new Recipe('Schabowe', 'Pyszny schabowy', 'https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/schabowe_01.jpg', [{amount: 2, name: 'Meat'}, {amount: 3, name: 'Corn'}]),
        new Recipe('Sznycel', 'Pyszny sznycel', 'https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/schabowe_01.jpg', [{amount: 2, name: 'Meat'}, {amount: 3, name: 'Corn'}])
    ];

    recipesChanged = new Subject<Recipe[]>; 

    getRecipes() {
        return structuredClone(this.recipes);
    }

    getRecipe(index: number) {
        return structuredClone(this.recipes)[index];
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