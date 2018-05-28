import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, ModalController } from 'ionic-angular';
import {Tournament} from "../../classes/Tournament";
import {Game} from "../../classes/Game";
import {SetscorePage} from "../set_score/setscore";

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
    let myModal = this.modalCtrl.create(SetscorePage, {game: game});

    myModal.onDidDismiss(data => {
      if(data.status === "SAVE"){
        this.firebaseService.updateScore(this.tournament, game);
      }else{
        game.score1 = null;
        game.score2 = null;
      }
    });

    myModal.present();
  }
}
