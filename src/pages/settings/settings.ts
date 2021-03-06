import { Component, ViewChild } from '@angular/core';
import {NavController, Content, ToastController} from 'ionic-angular';

import {Tournament} from "../../classes/Tournament";
import {LocalServiceProvider} from "../../providers/local-service/local-service";
import {FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})


export class SettingsPage {

  newTournament:Tournament;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public firebaseService: FirebaseServiceProvider, public localService:
    LocalServiceProvider, private toastCtrl: ToastController) {
    this.newTournament = localService.getNewTournament()
  }

  saveTournament(){
    if(this.newTournament.name === null || this.newTournament.name === ""){
      this.toastCtrl.create({
        message: 'Bitte Turniernamen eingeben!',
        duration: 3000,
        position: 'top'
      }).present();
    }else{
      this.newTournament.generateGamePlan();

      this.firebaseService.addTournament(this.newTournament);

      this.navCtrl.popToRoot();
    }
  }
}
