import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';

import { Recipe } from '../recipe.model';
import { LocalShoppingListService } from 'src/app/shopping-list/local-shopping-list.service';
import { LocalRecipceService } from '../local-recipes.service';
import { DataStorageFavoritesService } from 'src/app/data-storage/ds-favorites.service';
import { LocalFavoritesService } from '../favorites/local-favorites.service';
import { DataStorageShoppingListService } from 'src/app/data-storage/ds-shopping-list.service';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  id: string;
  recipe: Recipe;
  isInFavorites: boolean;
  favoritesSubscription: Subscription; 
  authSubscription: Subscription; 
  isAuthenticated: boolean; 

  constructor(
    private dsFavortiesService: DataStorageFavoritesService,
    private dsShoppingListService: DataStorageShoppingListService, 
    private localFavoriteService: LocalFavoritesService,
    private localShoppingListService: LocalShoppingListService,
    private localRecipeService: LocalRecipceService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }
  
  ngOnInit(): void {
      this.route.params.pipe(
        switchMap((params: Params) => {
          this.id = params['id'];
          this.recipe = this.localRecipeService.getRecipe(this.id); 
          this.isInFavorites = this.localFavoriteService.checkIfRecipeIsFavorite(this.id); // rename to isFavorite
          return this.localFavoriteService.favoritesChanged; 
        })
      ).subscribe(() => {
        this.isInFavorites = this.localFavoriteService.checkIfRecipeIsFavorite(this.id); 
      })
      
      this.favoritesSubscription = this.localFavoriteService.favoritesChanged.subscribe(); 

      this.authSubscription = this.authService.user.subscribe((user) => {
        this.isAuthenticated = !!user;
      })
  }

  ngOnDestroy(): void {
      this.favoritesSubscription.unsubscribe(); 
      this.authSubscription.unsubscribe(); 
  }

  onAddToFavorites() {
    this.dsFavortiesService.addToFavorites(this.id).subscribe();
  }

  onRemoveFromFavorites() {
    this.dsFavortiesService.removeFromFavorites(this.id).subscribe(); 
  }

  onAddToShoppingList() {
    for (let ingredient of this.recipe.ingredients) {
      this.localShoppingListService.addIngredient(ingredient);
    }
    this.dsShoppingListService.saveShoppingList().subscribe(); 
  }

  onDelete() {
    //this.recipeService.removeRecipe(this.id); 
    this.router.navigate(['/recipes'], { relativeTo: this.route });
  }
}
