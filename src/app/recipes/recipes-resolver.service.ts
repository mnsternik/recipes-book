import { Injectable, inject } from "@angular/core";
import { Resolve } from "@angular/router";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipceService } from "./recipe.service";

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(private dataStorageService: DataStorageService, private recipesService: RecipceService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipesService.getRecipes(); 
        if (recipes.length === 0) {
            return this.dataStorageService.fetchRecipes();
        } else {
            return recipes;
        }
    }
}