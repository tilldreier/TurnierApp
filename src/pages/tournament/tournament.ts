import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import {Tournament} from "../../classes/Tournament";

@Component({
  selector: 'page-tournament',
  templateUrl: 'tournament.html'
})
export class TournamentPage {

  tournament: Tournament;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService:
    FirebaseServiceProvider) {
    this.tournament = navParams.data;
  }
}
