import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Observable } from 'rxjs/Observable';
import { StatusBar } from '@ionic-native/status-bar';

import { Component, ViewChild } from '@angular/core';
import {NavController, Content, ModalController} from 'ionic-angular';

import { NewPage } from '../new/new';
import {TournamentPage} from "../tournament/tournament";
import {Tournament} from "../../classes/Tournament";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tournaments: Observable<any[]>;
  newItem: any = '';

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public firebaseService:
    FirebaseServiceProvider, public modalCtrl: ModalController, public statusBar: StatusBar) {
    this.tournaments = this.firebaseService.getTournaments();
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#ffffff');
  }

  newTournament(){
    this.navCtrl.push(NewPage);
  }

  goToTournament(tournament:Tournament){
    this.navCtrl.push(TournamentPage,tournament);
  }

  getClass(index: number){
    let classes: Array<string> = ['green', 'orange', 'red'];

    return classes[index % 3];
  }

}
