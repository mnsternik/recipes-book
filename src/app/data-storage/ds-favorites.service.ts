import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { map, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { LocalFavoritesService } from "../recipes/favorites/local-favorites.service";


@Injectable({ providedIn: 'root' })
export class DataStorageFavoritesService {

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private localFavoritesService: LocalFavoritesService) { }


    addToFavorites(recipeId: string) {
        const userId = this.authService.user.value.id;
        return this.http.put(`https://meals-manager-aafb2-default-rtdb.firebaseio.com/favorites/${userId}/${recipeId}.json`, true)
            .pipe(
                tap(() => {
                    this.localFavoritesService.addToFavorites(recipeId);
                })
            );
    }

    removeFromFavorites(recipeId: string) {
        const userId = this.authService.user.value.id;
        return this.http.delete(`https://meals-manager-aafb2-default-rtdb.firebaseio.com/favorites/${userId}/${recipeId}.json`)
            .pipe(
                tap(() => {
                    this.localFavoritesService.removeFromFavorites(recipeId); 
                })
            );
    }

    fetchFavorites() {
        const userId = this.authService.user.value.id;
        return this.http.get(`https://meals-manager-aafb2-default-rtdb.firebaseio.com/favorites/${userId}.json`)
            .pipe(
                map((favorites) => {
                    const fetchedFavorites = [];
                    for (let key in favorites) {
                        fetchedFavorites.push(key);
                    }
                    return fetchedFavorites;
                }),
                tap((fetchedFavorites) => {
                    this.localFavoritesService.setFavorites(fetchedFavorites); 
                })
            );
    }
}