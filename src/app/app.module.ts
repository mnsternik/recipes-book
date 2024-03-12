import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 

import { DropdownDirective } from './shared/dropdown.directive';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { LocalShoppingListService } from './shopping-list/local-shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeSelectInfoComponent } from './recipes/recipe-select-info/recipe-select-info.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { LocalRecipceService } from './recipes/local-recipes.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { RecipeSearchFilterPipe } from './recipes/recipe-search-filter.pipe';
import { TagComponent } from './recipes/tag/tag.component';
import { ShortenDirective } from './shared/shorten.directive';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipeSelectInfoComponent,
    RecipeEditComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    RecipeSearchFilterPipe,
    TagComponent,
    ShortenDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule, 
  ],
  providers: [LocalShoppingListService, LocalRecipceService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
