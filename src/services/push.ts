import { Injectable, inject } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PushService {
  private swPush = inject(SwPush);
  private http = inject(HttpClient);

  readonly VAPID_PUBLIC_KEY = "YOUR_PUBLIC_KEY_HERE";

  subscribeToNotifications() {
    if (!this.swPush.isEnabled) {
      console.warn("Service Worker Push is NOT enabled.");
      return;
    }

    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => {
      console.log("SUBSCRIPTION SUCCESS:", sub);
      this.http.post("http://localhost:3000/subscribe", sub).subscribe();
    })
    .catch(err => console.error("Could not subscribe", err));
  }
}
