import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";


export class ShoppingListService {

    ingredientChanged = new Subject<Ingredient[]>();
    ingredientSelected = new Subject<number>(); 

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 10),
        new Ingredient('Tomatoes', 6)
    ]

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

    private findIngredientIndex(ingredient: Ingredient): number {
        const ingredients = this.ingredients.map(ing => ing.name);
        return ingredients.indexOf(ingredient.name); 
    }
}