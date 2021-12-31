import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit, OnDestroy {
  Uid;
  dataProfile = {
    flName: '',
    image: '',
    bio: '',
    uid: '',
  };

  imageProfile: 'https://scontent.ftun2-1.fna.fbcdn.net/v/t39.30808-6/258507150_1896826700521639_1902889433822845337_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=GnFOPNUDQCQAX_RNUfb&_nc_ht=scontent.ftun2-1.fna&oh=00_AT8ASjshOjstZxu5QLSv1yeCwTqUfrfRbEEzYn7KsyoUWQ&oe=61D497F3';

  successUpdate;
  task: AngularFireUploadTask;
  ref: AngularFireStorageReference;
  persentages;
  userSubscribe: Subscription;
  constructor(
    private as: AuthService,
    private fs: AngularFirestore,
    private fst: AngularFireStorage
  ) {
    this.userSubscribe = this.as.user.subscribe((user) => {
      this.Uid = user.uid;
    });
  }

  ngOnInit(): void {
    this.fs
      .collection('users')
      .ref.doc(localStorage.getItem('userConnect'))
      .get()
      .then((data) => {
        console.log(data.data());
        this.dataProfile.flName = data.data()['flName'];
        this.dataProfile.image = data.data()['image'];
        this.dataProfile.bio = data.data()['bio'];
        this.dataProfile.uid = localStorage.getItem('userConnect');
      });
  }
  ngOnDestroy() {
    this.userSubscribe.unsubscribe();
  }
  update() {
    this.fs
      .collection('users')
      .doc(this.dataProfile.uid)
      .update({
        flName: this.dataProfile.flName,
        bio: this.dataProfile.bio,
      })
      .then(() => {
        this.successUpdate = 'updated!';
        window.location.reload();
      });
  }
  uploadImage(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.fst.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.persentages = this.task.percentageChanges();
    this.task.then((data) => {
      data.ref.getDownloadURL().then((url) => {
        this.fs.collection('users').doc(this.dataProfile.uid).update({
          image: url,
        });
      });
    });
  }
}
