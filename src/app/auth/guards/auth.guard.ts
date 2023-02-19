import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route,CanLoad, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad, CanActivate {

  constructor(private authService: AuthService,
    private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return this.authService.verificaAutenticacion()
      .pipe(
        tap(estaAutenticado => {
          if (!estaAutenticado) {
            this.router.navigate(['./auth/login'])
          }
        })
      )
      // if (this.authService.auth.id) {
      //   return true;
      // }
      // console.log('bloqueado x CanActive');
      
      // return false;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // console.log('canLoad', true);
      // console.log(route);
      // console.log(segments);

      // if (this.authService.auth.id) {
      //   return true;
      // }
      // console.log('bloqueado x CanLoad');
      
      return this.authService.verificaAutenticacion()
      .pipe(
        tap(estaAutenticado => {
          if (!estaAutenticado) {
            this.router.navigate(['./auth/login'])
          }
        })
      )
  }
}
