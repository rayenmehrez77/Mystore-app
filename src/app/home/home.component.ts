import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isUser;
  userEmail;
  fullName;
  constructor(private as: AuthService, private fs: AngularFirestore) {
    this.as.user.subscribe((user) => {
      if (user) {
        this.isUser = true;
        this.userEmail = user.email;
      } else {
        this.isUser = false;
      }
    });
  }

  ngOnInit(): void {
    this.fs
      .collection('users')
      .ref.doc(localStorage.getItem('userConnect'))
      .get()
      .then((data) => {
        console.log(data.data());
        this.fullName = data.data()['flName'];
      });
  }
}
