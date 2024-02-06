import { Injectable, OnDestroy } from '@angular/core';
import {
  Auth,
  User,
  authState,
  user,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where,
  limit,
} from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { GlobalService } from '../global.service';

export interface UserAccount {
  nickname: string;
  userID: string;
  admin: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserAuthService implements OnDestroy {
  userSubscription: Subscription;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private globalService: GlobalService,
  ) {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.

      if (aUser == null) {
        console.log('Not signed in.');
      } else {
        if (aUser?.isAnonymous) {
          console.log('Signed in as anonymous user.');
        } else {
          console.log('Signed in as ' + aUser.email + '\n' + aUser.uid);
        }

        this.handleUser(this.auth);
      }
    });

    // if (aUser == null) {
    //   signInAnonymously(auth)
    //     .then(() => {
    //       // signed in
    //       console.log('Signed in anonymously.');
    //       this.handleUser(auth);
    //     })
    //     .catch((error) => {
    //       const code = error.code;
    //       const msg = error.message;
    //       console.log(`Could not sign in anonymously. \n${code}\n${msg}`);
    //     });
    // }
  }

  logout() {
    signOut(this.auth).then(() => {
      console.log('Signed out.');
      this.userSubscription.unsubscribe();
      signInAnonymously(this.auth).then(() => {
        console.log('signed in anonymously.');
      });
    });
  }

  SignInWithEmailPassword(email: string, password: string) {
    // this.handleUser(this.auth);
    if (this.auth.currentUser) this.auth.signOut();
    signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        console.log(
          'Signed in with email and password. Signed in as',
          this.auth.currentUser?.email,
        );
        this.handleUser(this.auth);
      })
      .catch((error) => {
        const code = error.code;
        const msg = error.message;
        console.log(
          `Could not sign in with email and password. \n${code}\n${msg}`,
        );
      });
  }

  handleUser(auth: any) {
    const user: User = auth.currentUser!;
    const accountCol = collection(this.firestore, 'accounts');
    const q = query(
      accountCol,
      where('userID', '==', auth.currentUser?.uid),
      limit(1),
    );
    const data = collectionData(q) as Observable<UserAccount[]>;
    this.userAccount$ = data;

    this.userAccount$.subscribe((a) => {
      console.log(a);
      if (a.length > 0) {
        this.isAdmin = a[0].admin;
        console.log(`user is admin: ${this.isAdmin}`);
        if (this.globalService.routeSubject.getValue() == 'admin')
          if (this.isAdmin) this.globalService.setRoute('home');
      }
    });
  }

  user$ = user(this.auth);
  authState$ = authState(this.auth);
  userAccount$?: Observable<UserAccount[]>;

  isAdmin: boolean = false;

  ngOnDestroy() {
    // when manually subscribing to an observable remember to unsubscribe in ngOnDestroy
    this.userSubscription.unsubscribe();
  }
}
