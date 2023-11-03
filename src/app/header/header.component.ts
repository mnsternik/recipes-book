import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    private authSubscription: Subscription;
    isAuthenticated = false; 
    collapsed = true;


    constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

    ngOnInit(): void {
        this.authSubscription = this.authService.user.subscribe(user => {
                this.isAuthenticated = !user ? false : true; 
            }
        )
    }

    onFetchRecipes() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onSaveRecipes() {
        this.dataStorageService.storeRecipes();
    }

    onLogout() {
        this.authService.logout(); 
    }

    ngOnDestroy(): void {
        this.authSubscription.unsubscribe(); 
    }

}