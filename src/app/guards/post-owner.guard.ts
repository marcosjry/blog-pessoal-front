import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../auth/services/login.service';
import { PostService } from '../components/posts/service/post.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostOwnerGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private postService: PostService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const postId = route.params['id'];
    const currentUserId = Number(this.loginService.getUserAuthenticated());

    return this.postService.getPost(postId).pipe(
      map(post => {
        if (post.usuarioId === currentUserId) {
          return true;
        } else {
          this.router.navigate(['']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['']);
        return of(false);
      })
    );
  }
}
