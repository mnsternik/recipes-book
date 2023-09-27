import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipceService } from '../recipe.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  id: number; 
  recipe: Recipe;

  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipceService,
    private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(+params['id']);
      }
    )
  }

  onAddToShoppingList() {
    for (let ingredient of this.recipe.ingredients) {
      this.shoppingListService.addIngredient(ingredient)
    }
  }

  onDelete() {
    this.recipeService.removeRecipe(this.id); 
    this.router.navigate(['/recipes'], {relativeTo: this.route });
  }
}
