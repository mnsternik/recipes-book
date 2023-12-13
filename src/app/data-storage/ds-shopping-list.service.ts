import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { tap } from "rxjs";
import { LocalShoppingListService } from "../shopping-list/local-shopping-list.service";

@Injectable({ providedIn: 'root' })
export class DataStorageShoppingListService {

    constructor(private http: HttpClient, private authService: AuthService, private localShoppingListService: LocalShoppingListService) { }

    fetchShoppingList() {
        const userId = this.authService.user.value.id;
        return this.http.get<Ingredient[]>(`https://meals-manager-aafb2-default-rtdb.firebaseio.com/shopping-list/${userId}.json`)
            .pipe(
                tap((ingredients: Ingredient[]) => {
                    if (!ingredients) {
                        this.localShoppingListService.setIngredients([]);
                    } else {
                        this.localShoppingListService.setIngredients(ingredients);
                    }
                })
            )
    }

    saveShoppingList() {
        const userId = this.authService.user.value.id;
        const shoppingListItems = this.localShoppingListService.getIngredients();
        return this.http.put(`https://meals-manager-aafb2-default-rtdb.firebaseio.com/shopping-list/${userId}.json`, shoppingListItems);
    }
}