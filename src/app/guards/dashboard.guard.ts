import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthoService } from '../services/autho.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardGuard implements CanActivate {
  constructor(private authService: AuthoService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.authService.tokenSubject.value;
    if (token) {
      const decodedToken = this.authService.decodeAccessToken();
      if (decodedToken && decodedToken.userType === 'Admin') {
        return true;
      }
    }


    this.router.navigate(['/login']); 
    return false;
  }
}
