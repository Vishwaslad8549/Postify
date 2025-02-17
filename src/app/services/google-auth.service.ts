import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

declare const google: any;
@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private clientId = '805969358163-nt2d6iilr8j129mp3grciue85agkb44p.apps.googleusercontent.com'; // Replace with your actual Client ID

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
