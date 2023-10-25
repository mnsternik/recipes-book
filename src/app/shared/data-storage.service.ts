import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { map, tap } from "rxjs";
import { RecipceService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";


@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipceService) { }

    storeRecipes() {
        // send HTTP request
        const recipes = this.recipeService.getRecipes()
        this.http
            .put('https://meals-manager-aafb2-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe((response) => {
                console.log('recipes stored', response);
            })
    }

    fetchRecipes() {
        // send HTTP request
        return this.http
            .get<Recipe[]>('https://meals-manager-aafb2-default-rtdb.firebaseio.com/recipes.json')
            .pipe(
                map((recipes) => {
                    return recipes.map(recipe => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        }
                    })
                }),
                tap((recipes) => {
                    this.recipeService.setRecipes(recipes);
                })
            )
    }
}