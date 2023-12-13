import { Injectable, inject } from "@angular/core";
import { Resolve } from "@angular/router";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { LocalFavoritesService } from "./local-favorites.service";
import { DataStorageFavoritesService } from "src/app/data-storage/ds-favorites.service";
import { AuthService } from "src/app/auth/auth.service";

@Injectable({ providedIn: 'root' })
export class FavoritesResolverService implements Resolve<string[]> {
    constructor(
        private dsFavoritesService: DataStorageFavoritesService, 
        private localRecipesService: LocalFavoritesService,
        private authService: AuthService ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authService.user.value) {
            return []; 
        }

        const favorites = this.localRecipesService.getFavorites(); 
        if (favorites.length === 0) {
            return this.dsFavoritesService.fetchFavorites();
        } else {
            return favorites;
        }
    }
}