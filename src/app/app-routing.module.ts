import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ShoppingEditComponent } from "./shopping-list/shopping-edit/shopping-edit.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeSelectInfoComponent } from "./recipes/recipe-select-info/recipe-select-info.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    {
        path: 'shopping-list', component: ShoppingListComponent, children: [
            { path: 'edit', component: ShoppingEditComponent }
        ]
    },
    {
        path: 'recipes', component: RecipesComponent, children: [
            { path: '', component: RecipeSelectInfoComponent, pathMatch: 'full' },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent },
            { path: ':id/edit', component: RecipeEditComponent}
        ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}