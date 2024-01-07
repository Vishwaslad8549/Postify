import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export function authGuard(): CanActivateFn {
  return () => {
    const authService: AuthService = inject(AuthService);
    
    if (authService.Isloggedin ) {
      console.log(" AuthGuard true");
      return true;
    }
    else
    return false;
  };
}