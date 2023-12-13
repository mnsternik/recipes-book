import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { LocalRecipceService } from '../local-recipes.service';
import { Recipe } from '../recipe.model';
import { AuthService } from 'src/app/auth/auth.service';
import { LocalFavoritesService } from '../favorites/local-favorites.service';
import { DataStorageRecipesService } from 'src/app/data-storage/ds-recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[]; 
  favorites: string[]; 
  recipeSubscription: Subscription;
  searchedRecipeName = ''; 
  userId: string; 
  mode: 'all' | 'favorites' | 'my'; 

  constructor(
    private authService: AuthService,
    private localRecipceService: LocalRecipceService,
    private localFavoritesService: LocalFavoritesService,
    private dsRecipesService: DataStorageRecipesService,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.recipes = this.localRecipceService.getRecipes();
    this.favorites = this.localFavoritesService.getFavorites(); 
    this.userId = this.authService.user.value ? this.authService.user.value.id : ''; 
    this.recipeSubscription = this.localRecipceService.recipesChanged.subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
          this.filterRecipes();
        }
      ) 
    this.route.queryParams.subscribe(
      (params: Params) => {
        this.mode = params.mode; 
        this.filterRecipes();
    })
  }

  onRefresh() {
    this.dsRecipesService.fetchRecipes().subscribe(); 
  }

  private filterRecipes(): void {
    if (this.mode === 'my') {
      this.filteredRecipes = this.recipes.filter(recipe => recipe.authorId === this.userId); 
    }
    else if (this.mode === 'favorites') {
      this.filteredRecipes = this.recipes.filter(recipe => this.localFavoritesService.checkIfRecipeIsFavorite(recipe.id)); 
    }
    else {
      this.filteredRecipes = [...this.recipes]; 
    }
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
