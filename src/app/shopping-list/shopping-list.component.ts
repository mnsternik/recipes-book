import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { LocalShoppingListService } from './local-shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private ingredientsSubscription: Subscription;  
  ingredients: Ingredient[];

  constructor(private localShoppingListService: LocalShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.localShoppingListService.getIngredients();
    this.ingredientsSubscription = this.localShoppingListService.ingredientChanged.subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients
        }
      )
  };

  ngOnDestroy(): void {
    this.ingredientsSubscription.unsubscribe(); 
  }

  onEditItem(index: number) {
    this.localShoppingListService.ingredientSelected.next(index); 
  }

}
