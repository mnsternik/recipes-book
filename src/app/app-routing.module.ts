import { ComponentFactoryResolver, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ShoppingEditComponent } from "./shopping-list/shopping-edit/shopping-edit.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeSelectInfoComponent } from "./recipes/recipe-select-info/recipe-select-info.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipesResolverService } from "./recipes/recipes-resolver.service";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth-guard";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
import { FavoritesResolverService } from "./recipes/favorites/favorites-resolver.service";
import { ShoppingListResolverService } from "./shopping-list/shopping-list-resolver.service";
import { GuestGuard } from "./auth/guest-guard";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/recipes?mode=all',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: AuthComponent,
        canActivate: [GuestGuard]
    },
    {
        path: 'register',
        component: AuthComponent,
        canActivate: [GuestGuard]
    },    
    {
        path: 'shopping-list',
        component: ShoppingListComponent,
        canActivate: [AuthGuard],
        resolve: [ShoppingListResolverService],
        children: [
            {
                path: 'edit',
                component: ShoppingEditComponent
            }
        ]
    },
    {
        path: 'recipes',
        component: RecipesComponent,
        resolve: [RecipesResolverService],
        children: [
            {
                path: '',
                component: RecipeListComponent,
                resolve: [FavoritesResolverService]
            },
            {
                path: '',
                component: RecipeSelectInfoComponent,
                pathMatch: 'full'
            },
            {
                path: 'new',
                component: RecipeEditComponent,
                canActivate: [AuthGuard]
            },
            {
                path: ':id',
                component: RecipeDetailComponent,
                resolve: [RecipesResolverService, FavoritesResolverService, ShoppingListResolverService]
            },
            {
                path: ':id/edit',
                component: RecipeEditComponent,
                canActivate: [AuthGuard],
                resolve: [RecipesResolverService]
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}