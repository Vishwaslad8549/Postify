import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment'
declare const google: any;
@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private clientId = environment.clientId // Replace with your actual Client ID

  constructor() {}

  initializeGoogleLogin(callback: (response: any) => void): void {
    google.accounts.id.initialize({
      client_id: this.clientId,
      callback: callback,
    });
  }

  attachSignin(element: HTMLElement, callback: (response: any) => void): void {
    this.initializeGoogleLogin(callback);
    google.accounts.id.renderButton(element, {
      theme: 'outline',
      size: 'large'
    });
  }

  decodeJwtToken(token: string): any {
    return jwtDecode(token);
  }
}
