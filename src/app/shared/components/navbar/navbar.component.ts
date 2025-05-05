import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { LoginService } from '../../../auth/services/login.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    MatButtonModule, 
    MatMenuModule,
    MatDividerModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  activeMenu: string = 'home';
  userAuthenticated: boolean = false;

  private menuActions: { [key: string]: () => void } = {
    home: () => this.router.navigate(['']),
    login: () => this.router.navigate(['auth/login']),
    signup: () => this.router.navigate(['auth/register']),
    write: () => this.router.navigate(['post/create']),
    myposts: () => this.router.navigate(['post/user-posts']),
    analytics: () => this.router.navigate(['analytics']),
    logout: () => {
      this.service.logout();
      this.router.navigate(['auth/login']);
    }
  };

  private updateActiveMenu(url: string): void {
    if (url.startsWith('/post/create')) this.activeMenu = 'write';
    else if (url.startsWith('/post/user-posts')) this.activeMenu = 'myposts';
    else if (url.startsWith('/analytics')) this.activeMenu = 'analytics';
    else if (url.startsWith('/auth/login')) this.activeMenu = 'login';
    else if (url.startsWith('/auth/register')) this.activeMenu = 'signup';
    else this.activeMenu = 'home'; // default
  }

  constructor(
    private router: Router,
    private service: LoginService
  ) { this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.updateActiveMenu(event.urlAfterRedirects);

      this.userAuthenticated = this.service.isUserAuthenticated(); 
    });
    this.service.isAuthenticated$.subscribe(value => {
      this.userAuthenticated = value;
    });
    console.log(this.userAuthenticated);
  }

  setActiveMenu(menu: string): void {
    this.activeMenu = menu;
    const action = this.menuActions[menu];
    if (action) {
      action();
    }
  }

  get shouldShowNavbar() {
    return !this.router.url.includes('/auth');
  }

  get shouldShowUnauthenticatedOption() {
    return this.service.isUserAuthenticated();
  }
}
