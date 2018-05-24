import {Injectable} from '@angular/core';

import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Tournament} from "../../classes/Tournament";
import "rxjs/add/operator/map";

/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {
  itemsRef: AngularFireList<Tournament>;
  items: Observable<Tournament[]>;

  constructor(public afd: AngularFireDatabase) {
    this.itemsRef = this.afd.list('/tournaments/')
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).map(
      Tournament.fromJsonList
    );
  }

  getTournaments(){
    return this.items;
  }
  addTournament(tournament) {
    return this.itemsRef.push(tournament);
  }

}
