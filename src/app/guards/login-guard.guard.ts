import { CanActivateFn,Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const loginGuardGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if(loginService.isAuthenticated()){
    return true;
  }else {
    router.navigate(['/login']);
    return false;
  }
}
