import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Observable } from 'rxjs/Observable';

import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';

import { NewPage } from '../new/new';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tournaments: Observable<any[]>;
  newItem: any = '';

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public firebaseService:
    FirebaseServiceProvider) {
    this.tournaments = this.firebaseService.getTournaments();
  }

  newTournament(){
    this.navCtrl.push(NewPage);
  }

}
