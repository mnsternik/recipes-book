import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe; 
  @Input() index: number; 

  maxTagsAmount = 3; 
  visiableTags: string[] = []; 
  tagsAmountExceeded: boolean; 

  ngOnInit(): void {
      this.tagsAmountExceeded = this.recipe.tags.length > this.maxTagsAmount; 
      if (this.tagsAmountExceeded) {
          this.visiableTags = this.recipe.tags.slice(0, this.maxTagsAmount); 
      } else {
          this.visiableTags = this.recipe.tags.slice(); 
      }
  }
}
