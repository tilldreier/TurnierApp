import {Injectable} from '@angular/core';

import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(public afd: AngularFireDatabase) {
    this.itemsRef = this.afd.list('/tournaments/');
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getItems(){
    return this.items;
  }
  addTournament(tournament) {
    return this.itemsRef.push(tournament);
  }
  updateItem(key, newText) {
    return this.itemsRef.update(key, { value: newText });

  }
  //sets an item to done or undone
  doneItem(key, status) {
    return this.itemsRef.update(key, { isDone: status });
  }
  deleteItem(key) {
    this.itemsRef.remove(key);
  }

}
