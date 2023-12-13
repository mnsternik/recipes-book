import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.authSubscription = this.authService.user.subscribe(user => {
                this.isAuthenticated = !!user; 
            }
        )
    }

    onLogout() {
        this.authService.logout(); 
    }

    ngOnDestroy(): void {
        this.authSubscription.unsubscribe(); 
    }
}