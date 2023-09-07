import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipceService {

    recipeSelected = new EventEmitter<Recipe>(); 

    private recipes: Recipe[] = [
        new Recipe('Schabowe', 'Pyszny schabowy', 'https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/schabowe_01.jpg', [{amount: 2, name: 'Meat'}, {amount: 3, name: 'Corn'}]),
        new Recipe('Sznycel', 'Pyszny sznycel', 'https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/schabowe_01.jpg', [{amount: 2, name: 'Meat'}, {amount: 3, name: 'Corn'}])
    ];

    getRecipes() {
        return this.recipes.slice(); 
    }

    getRecipe(index: number) {
        return this.recipes[index]
    };

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe); 
    }

    removeRecipe(index: number) {
        this.recipes.splice(index, 1); 
    }
}