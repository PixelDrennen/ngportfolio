import { Injectable, OnDestroy } from '@angular/core';
import {
  Auth,
  User,
  authState,
  user,
  signInAnonymously,
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

  constructor(private auth: Auth, private firestore: Firestore) {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
      console.log(aUser);
    });

    signInAnonymously(auth)
      .then(() => {
        // signed in
        console.log('Signed in anonymously.');
        this.handleUser(auth);
      })
      .catch((error) => {
        const code = error.code;
        const msg = error.message;
        console.log(`Could not sign in anonymously. \n${code}\n${msg}`);
      });
  }

  handleUser(auth: any) {
    const user: User = auth.currentUser!;
    const accountCol = collection(this.firestore, 'accounts');
    const q = query(
      accountCol,
      where('userID', '==', auth.currentUser?.uid),
      limit(1)
    );
    const data = collectionData(q) as Observable<UserAccount[]>;
    this.userAccount$ = data;

    this.userAccount$.subscribe((a) => {
      console.log(a);
    });
  }

  user$ = user(this.auth);
  authState$ = authState(this.auth);
  userAccount$?: Observable<UserAccount[]>;

  ngOnDestroy() {
    // when manually subscribing to an observable remember to unsubscribe in ngOnDestroy
    this.userSubscription.unsubscribe();
  }
}
