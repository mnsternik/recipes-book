import { Component } from '@angular/core';
import { RecipceService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipceService]
})
export class RecipesComponent {

}
