import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type NotificationType = 'success' | 'error' | 'info';

export interface Notification {
  message: string;
  type: NotificationType;
  duration?: number; // milliseconds
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notification = new BehaviorSubject<Notification | null>(null);
  notification$ = this.notification.asObservable();

  show(message: string, type: NotificationType = 'info', duration: number = 3000) {
    this.notification.next({ message, type, duration });
    if (duration > 0) {
      setTimeout(() => this.clear(), duration);
    }
  }

  clear() {
    this.notification.next(null);
  }
}
