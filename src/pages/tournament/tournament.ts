import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

import { Component, ViewChild } from '@angular/core';
import {NavController, NavParams, Content, ModalController, ToastController} from 'ionic-angular';
import {Tournament} from "../../classes/Tournament";
import {Game} from "../../classes/Game";
import {SetscorePage} from "../set_score/setscore";
import {SetnotificationPage} from "../set_notification/setnotification";
import {PlayoffRound} from "../../classes/PlayoffRound";

@Component({
  selector: 'page-tournament',
  templateUrl: 'tournament.html'
})
export class TournamentPage {

  tournament: Tournament;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService:
    FirebaseServiceProvider, public modalCtrl: ModalController, public toastCtrl: ToastController) {
    this.tournament = navParams.data;
  }

  addResult(game: Game){
    let setScoreModal = this.modalCtrl.create(SetscorePage, {game: game});

    setScoreModal.onDidDismiss(data => {
      if(data !== null && data.status !== null && data.status === "SAVE"){
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

  addPlayoffResult(game: Game, playOffRound:PlayoffRound){
    if(playOffRound.status === PlayoffRound.STATUS_FIX){
      let setScoreModal = this.modalCtrl.create(SetscorePage, {game: game});

      setScoreModal.onDidDismiss(data => {
        if(data !== null && data.status !== null && data.status === "SAVE"){
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
    }else{
      this.toastCtrl.create({
        message: 'Gruppenspiele sind noch nicht beendet!',
        duration: 3000,
        position: 'top'
      }).present();
    }
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
