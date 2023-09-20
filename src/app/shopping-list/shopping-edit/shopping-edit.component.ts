import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ingredientForm: NgForm;
  editSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.editSubscription = this.shoppingListService.ingredientSelected.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.ingredientForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    )
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }

  onAddIngredient() {
    const newIngredient = new Ingredient(
      this.ingredientForm.value.name,
      this.ingredientForm.value.amount
    );
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.ingredientForm.reset();
    this.editMode = false;
  }

  onClear() {
    this.ingredientForm.reset();
    this.editMode = false;
  }

  onDeleteItem(index: number) {
    this.shoppingListService.deleteIngredient(index); 
    this.ingredientForm.reset();
    this.editMode = false;
  }
}
