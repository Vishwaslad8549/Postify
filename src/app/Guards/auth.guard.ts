import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export function authGuard(): CanActivateFn {
  return () => {
    const authService: AuthService = inject(AuthService);
    
    if (authService.isloggedin() ) {
      return true;
    }
    else
    return true;
  };
}