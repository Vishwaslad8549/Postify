import { CanActivateFn } from '@angular/router';

export const demoGuard: CanActivateFn = (route, state) => {
  return true;
};
