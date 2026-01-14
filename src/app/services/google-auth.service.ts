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

  private waitForGoogle(maxAttempts = 50, intervalMs = 100): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof google !== 'undefined' && google?.accounts?.id) {
        resolve();
        return;
      }
      let attempts = 0;
      const id = setInterval(() => {
        attempts++;
        if (typeof google !== 'undefined' && google?.accounts?.id) {
          clearInterval(id);
          resolve();
        } else if (attempts >= maxAttempts) {
          clearInterval(id);
          reject(new Error('Google API not loaded'));
        }
      }, intervalMs);
    });
  }

  attachSignin(element: HTMLElement, callback: (response: any) => void): void {
    if (!element) {
      console.warn('GoogleAuthService.attachSignin: target element is null');
      return;
    }

    this.waitForGoogle().then(() => {
      this.initializeGoogleLogin(callback);
      google.accounts.id.renderButton(element, {
        theme: 'outline',
        size: 'large'
      });
    }).catch((err) => {
      console.warn('GoogleAuthService.attachSignin: Google API not available', err);
    });
  }

  decodeJwtToken(token: string): any {
    return jwtDecode(token);
  }
}
