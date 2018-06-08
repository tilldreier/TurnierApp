import {Injectable} from '@angular/core';

import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Tournament} from "../../classes/Tournament";
import "rxjs/add/operator/map";
import {Game} from "../../classes/Game";

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

    this.itemsRef = this.afd.list('/tournaments/', ref => ref.orderByChild('createdOnInverse'));
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

  addNotification(notification) {
    return this.itemsRef.push(notification)
  }

  deleteItem(key) {
    this.itemsRef.remove(key)
  }

  updateScore(tournament:Tournament, game:Game){
    this.afd.database.ref('/tournaments/'+tournament.key+"/games/"+game.id).set({
      team1: game.team1,
      team2: game.team2,
      score1: Number(game.score1),
      score2: Number(game.score2)
    });
  }

  updateStatus(tournament: Tournament){
    this.afd.database.ref('/tournaments/'+tournament.key).set({
      status: tournament.status
    });
  }

  savePlayoffs(tournament: Tournament) {
    this.afd.database.ref('/tournaments/'+tournament.key+"/playoffRounds").set(
      tournament.playoffRounds
    );
  }

  updateNotifications(tournament:Tournament){
    this.afd.database.ref('/tournaments/'+tournament.key+"/notifications").set(
      tournament.notifications
    );
  }
}
