import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RecipceService } from '../recipe.service';

import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription; 

  constructor(
    private recipceService: RecipceService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.recipes = this.recipceService.getRecipes()
    this.subscription = this.recipceService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes; 
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); 
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
}
