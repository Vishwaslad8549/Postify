import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Notification, NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit, OnDestroy {
  notification: Notification | null = null;
  private sub?: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.sub = this.notificationService.notification$.subscribe(n => {
      this.notification = n;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
