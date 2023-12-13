import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { LocalShoppingListService } from '../local-shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataStorageShoppingListService } from 'src/app/data-storage/ds-shopping-list.service';

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

  constructor(private localShoppingListService: LocalShoppingListService, private dsShoppingListService: DataStorageShoppingListService) { }

  ngOnInit(): void {
    this.editSubscription = this.localShoppingListService.ingredientSelected.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.localShoppingListService.getIngredient(index);
        this.ingredientForm.setValue({
          name: this.editedItem.name,
          unit: this.editedItem.unit,
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
      this.ingredientForm.value.amount,
      this.ingredientForm.value.unit
    );
    if (this.editMode) {
      this.localShoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    }
    else {
      this.localShoppingListService.addIngredient(newIngredient);
    }
    this.dsShoppingListService.saveShoppingList().subscribe(); 
    this.ingredientForm.reset();
    this.editMode = false;
  }

  onClear() {
    this.ingredientForm.reset();
    this.editMode = false;
  }

  onDeleteItem(index: number) {
    this.localShoppingListService.deleteIngredient(index);
    this.dsShoppingListService.saveShoppingList().subscribe(); 
    this.ingredientForm.reset();
    this.editMode = false;
  }
}
