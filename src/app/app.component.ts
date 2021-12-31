import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'myStore';
  isUser;
  constructor(
    private af: AngularFireAuth,
    private route: Router,
    private as: AuthService
  ) {
    this.as.user.subscribe((user) => {
      if (user) {
        this.isUser = true;
      } else {
        this.isUser = false;
      }
    });
  }
}
