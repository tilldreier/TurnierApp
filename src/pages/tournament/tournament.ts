import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, ModalController } from 'ionic-angular';
import {Tournament} from "../../classes/Tournament";
import {Game} from "../../classes/Game";
import {SetscorePage} from "../set_score/setscore";
import {SetnotificationPage} from "../set_notification/setnotification";

@Component({
  selector: 'page-tournament',
  templateUrl: 'tournament.html'
})
export class TournamentPage {

  tournament: Tournament;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService:
    FirebaseServiceProvider, public modalCtrl: ModalController) {
    this.tournament = navParams.data;
  }

  addResult(game: Game){
    let setScoreModal = this.modalCtrl.create(SetscorePage, {game: game});

    setScoreModal.onDidDismiss(data => {
      if(data.status === "SAVE"){
        this.firebaseService.updateScore(this.tournament, game);
        if(this.tournament.updateStatus()){
          this.firebaseService.updateStatus(this.tournament);
        }
        this.tournament.updatePlayoffs();
        this.firebaseService.savePlayoffs(this.tournament);
      }else{
        game.score1 = null;
        game.score2 = null;
      }
    });

    setScoreModal.present();
  }

  addNotification(){
    let addNotificationModal = this.modalCtrl.create(SetnotificationPage);

    addNotificationModal.onDidDismiss(data => {
      if(data.notification.message !== null &&
        data.notification.message.length > 0){
        this.tournament.addNotification(data.notification);
        this.firebaseService.updateNotifications(this.tournament);
      }
    });

    addNotificationModal.present();
  }
}
