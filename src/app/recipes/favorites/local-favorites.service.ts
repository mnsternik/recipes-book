import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class LocalFavoritesService {

    private favorites: string[] = [];

    favoritesChanged = new Subject<string[]>;

    setFavorites(favorites: string[]) {
        this.favorites = favorites; 
        this.favoritesChanged.next(structuredClone(this.favorites)); 
    }

    getFavorites() {
        return structuredClone(this.favorites);
    }

    addToFavorites(recipeId: string) {
        this.favorites.push(recipeId);
        this.favoritesChanged.next(structuredClone(this.favorites));
    }

    removeFromFavorites(recipeId: string) {
        const index = this.favorites.indexOf(recipeId);
        this.favorites.splice(index, 1);
        this.favoritesChanged.next(structuredClone(this.favorites));
    }

    checkIfRecipeIsFavorite(recipeId: string) {
        return this.favorites.indexOf(recipeId) !== -1; 
    }
}