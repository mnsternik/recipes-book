import { Injectable, inject } from "@angular/core";
import { Resolve } from "@angular/router";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { Recipe } from "./recipe.model";
import { DataStorageRecipesService } from "../data-storage/ds-recipes.service";
import { LocalRecipceService } from "./local-recipes.service";

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(private dsRecipesService: DataStorageRecipesService, private localRecipesService: LocalRecipceService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.localRecipesService.getRecipes(); 
        if (recipes.length === 0) {
            return this.dsRecipesService.fetchRecipes();
        } else {
            return recipes;
        }
    }
}