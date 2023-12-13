import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { LocalRecipceService } from '../local-recipes.service';
import { DataStorageRecipesService } from 'src/app/data-storage/ds-recipes.service';
import { Recipe } from '../recipe.model';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: string;
  editMode = false;
  editedRecipe: Recipe;
  recipeForm: FormGroup;
  tags: string[] = [];

  get ingControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localRecipeService: LocalRecipceService,
    private dsRecipeService: DataStorageRecipesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        if (this.editMode) {
          this.editedRecipe = this.localRecipeService.getRecipe(this.id);
        }
        this.initForm();
      }
    )
  }

  onSubmit() {
    if (!this.editMode) {
      const newRecipe = { ...this.recipeForm.value, tags: this.tags };
      this.dsRecipeService.addRecipe(newRecipe).subscribe((res: { name: string }) => {
        this.router.navigate(['recipes', res.name])
      })
    }
    else {
      const updatedRecipe = {
        ...this.editedRecipe,
        ...this.recipeForm.value,
        tags: this.tags
      }
      this.dsRecipeService.updateRecipe(updatedRecipe).subscribe(() => {
        this.router.navigate(['recipes', this.id])
      });
    }
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'unit': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]\d*(\.\d{1,2})?$/)]),
      })
    )
  }

  onAddTag() {
    this.tags.push(this.recipeForm.get('tags').value);
    this.recipeForm.get('tags').setValue('');
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initForm() {
    let name = '';
    let description = '';
    let imagePath = '';
    let instructions = ''
    let price = 0;
    let preparationTime = 0;
    let tags = [];
    let calories = 0;
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      name = this.editedRecipe.name;
      description = this.editedRecipe.description;
      imagePath = this.editedRecipe.imagePath;
      instructions = this.editedRecipe.instructions;
      price = this.editedRecipe.price;
      preparationTime = this.editedRecipe.preparationTime;
      tags = this.editedRecipe.tags;
      calories = this.editedRecipe.calories;
      if (this.editedRecipe['ingredients']) {
        for (let ingredient of this.editedRecipe['ingredients']) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'unit': new FormControl(ingredient.unit, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]\d*(\.\d{1,2})?$/)]),
            })
          )
        }
      }
    }
    
    this.recipeForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'imagePath': new FormControl(imagePath),
      'description': new FormControl(description, Validators.required),
      'instructions': new FormControl(instructions),
      'price': new FormControl(price),
      'preparationTime': new FormControl(preparationTime),
      'tags': new FormControl(tags),
      'calories': new FormControl(calories),
      'ingredients': recipeIngredients
    })
  }
}
