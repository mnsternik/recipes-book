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
  tagsOptions: string[] = []; 
  selectedTags: string[] = [];

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
          this.selectedTags = this.editedRecipe.tags; 
        }
        this.initForm();
      }
    )
    this.tagsOptions = this.localRecipeService.tagOptions.slice(); 
  }

  onSubmit() {
    if (!this.editMode) {
      const newRecipe = { ...this.recipeForm.value, tags: this.selectedTags };
      this.dsRecipeService.addRecipe(newRecipe).subscribe((res: { name: string }) => {
        this.router.navigate(['recipes', res.name])
      })
    }
    else {
      const updatedRecipe = {
        ...this.editedRecipe,
        ...this.recipeForm.value,
        tags: this.selectedTags
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

  onTagClicked(tag: string) {
    if (this.selectedTags.includes(tag)) {
      this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
    }
    else {
      this.selectedTags.push(tag); 
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initForm() {
    const name = this.editMode ? this.editedRecipe.name : '';
    const description = this.editMode ? this.editedRecipe.description : '';
    const imagePath = this.editMode ? this.editedRecipe.imagePath : '';
    const instructions = this.editMode ? this.editedRecipe.instructions : '';
    const price = this.editMode ? this.editedRecipe.price : 0;
    const preparationTime = this.editMode ? this.editedRecipe.preparationTime : 0;
    const tags = this.editMode ? this.editedRecipe.tags : [];
    const calories = this.editMode ? this.editedRecipe.calories : 0;
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
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
