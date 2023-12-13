import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Ingredient } from "../shared/ingredient.model";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LocalShoppingListService } from "./local-shopping-list.service";
import { DataStorageShoppingListService } from "../data-storage/ds-shopping-list.service";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class ShoppingListResolverService implements Resolve<Ingredient[]> {

    constructor(
        private localShoppingListService: LocalShoppingListService,
        private dsShoppingListService: DataStorageShoppingListService,
        private authService: AuthService ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Ingredient[] | Observable<Ingredient[]> | Promise<Ingredient[]> {
        if (!this.authService.user.value) {
            return []; 
        }

        const shoppingListItems = this.localShoppingListService.getIngredients(); 
        if (shoppingListItems.length === 0) {
            return this.dsShoppingListService.fetchShoppingList(); 
        }
        else {
            return shoppingListItems; 
        }
    }
}
