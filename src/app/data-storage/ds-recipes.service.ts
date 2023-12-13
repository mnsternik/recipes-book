import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";

import { map, tap } from "rxjs";
import { LocalRecipceService } from "../recipes/local-recipes.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";


@Injectable({ providedIn: 'root' })
export class DataStorageRecipesService {

    constructor(
        private http: HttpClient,
        private localRecipeService: LocalRecipceService,
        private authService: AuthService) { }

    addRecipe(recipe: Recipe) {
        const newRecipe = { ...recipe, authorId: this.authService.user.value.id };
        return this.http.post(`https://meals-manager-aafb2-default-rtdb.firebaseio.com/recipes.json`, newRecipe)
            .pipe(
                tap((res: { name: string }) => {
                    this.localRecipeService.addRecipe({ ...newRecipe, id: res.name })
                })
            )
    }

    updateRecipe(recipe: Recipe) {
        return this.http.put(`https://meals-manager-aafb2-default-rtdb.firebaseio.com/recipes/${recipe.id}.json`, recipe)
            .pipe(
                tap(() => {
                    this.localRecipeService.updateRecipe(recipe.id, recipe);
                })
            )
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://meals-manager-aafb2-default-rtdb.firebaseio.com/recipes.json')
            .pipe(
                map((recipes) => {
                    const fetchedRecipes: Recipe[] = [];
                    for (let key in recipes) {
                        fetchedRecipes.push({ ...recipes[key], id: key })
                    }
                    return fetchedRecipes.map(recipe => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        }
                    })
                }),
                tap((recipes) => {
                    this.localRecipeService.setRecipes(recipes);
                })
            )
    }

    deleteRecipe(id: string) {
        return this.http.delete(`https://meals-manager-aafb2-default-rtdb.firebaseio.com/recipes/${id}.json`)
            .pipe(
                tap(() => {
                    // add deleting locallyW
                }));
    }
}