import { Component, ViewChild } from '@angular/core';
import { NavController, Content, TextInput } from 'ionic-angular';

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
    LocalServiceProvider) {
    this.newTournament = localService.getNewTournament()
  }

  saveTournament(){
    this.newTournament.generateGamePlan();

    this.firebaseService.addTournament(this.newTournament);
  }
}
