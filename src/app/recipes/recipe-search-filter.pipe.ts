import { Pipe, PipeTransform } from '@angular/core';

import { Recipe } from './recipe.model';

@Pipe({
  name: 'recipeSearchFilter'
})
export class RecipeSearchFilterPipe implements PipeTransform {

  transform(value: Recipe[], filterString: string, propName: string): Recipe[] {
    if (value.length === 0 || filterString.length === 0) {
      return value;
    }
    const resultArray = [];
    for (let recipe of value) {
      if (recipe[propName].toLowerCase().includes(filterString.toLowerCase())) {
        resultArray.push(recipe); 
      }
    }
    return resultArray; 
  }
}
