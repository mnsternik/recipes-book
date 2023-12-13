import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";


export class LocalShoppingListService {

    ingredientChanged = new Subject<Ingredient[]>();
    ingredientSelected = new Subject<number>(); 

    private ingredients: Ingredient[] = [];

    private findIngredientIndex(ingredient: Ingredient): number {
        return this.ingredients.findIndex(ing => ing.name === ingredient.name && ing.unit === ingredient.unit); 
    }

    setIngredients(ingredients: Ingredient[]) {
        this.ingredients = ingredients; 
        this.ingredientChanged.next(this.ingredients); 
    }

    getIngredients() {
        return structuredClone(this.ingredients);
    }

    getIngredient(index: number) {
        return structuredClone(this.ingredients[index]);
    }

    addIngredient(ingredient: Ingredient) {
        const ingIndex = this.findIngredientIndex(ingredient);
        if (ingIndex !== -1) {
            this.ingredients[ingIndex].amount = this.ingredients[ingIndex].amount + ingredient.amount;
        } else {
            this.ingredients.push(ingredient);
        }
        this.ingredientChanged.next(structuredClone(this.ingredients));
    }

    updateIngredient(index: number, ingredient: Ingredient) {
        const ingAlreadyExists = (this.findIngredientIndex(ingredient) !== -1);
        if (ingAlreadyExists) {
            const existingIngIndex = this.findIngredientIndex(ingredient); 
            this.ingredients[existingIngIndex].amount = ingredient.amount; 
        } else {
            this.ingredients[index] = ingredient; 
        }
        this.ingredientChanged.next(structuredClone(this.ingredients));
    }

    deleteIngredient(index: number) { 
        this.ingredients.splice(index, 1); 
        this.ingredientChanged.next(structuredClone(this.ingredients));
    }


}