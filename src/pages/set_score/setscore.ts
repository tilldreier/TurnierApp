import {Component} from '@angular/core';
import {ViewController, NavParams, ToastController} from 'ionic-angular';
import {Game} from "../../classes/Game";

@Component({
  selector: 'page-setscore',
  templateUrl: 'setscore.html'
})
export class SetscorePage {
  game: Game = this.navParams.get('game');

  constructor(public navParams: NavParams, public viewCtrl: ViewController, public toastCtrl: ToastController) {
  }

  close() {
    this.viewCtrl.dismiss({status: "CANCEL"});
  }

  save() {
    if(isNaN(this.game.score1) || isNaN(this.game.score2)) {
      this.toastCtrl.create({
        message: 'Resultat ist nicht korrekt!',
        duration: 3000,
        position: 'top'
      }).present();
    }else{
      this.viewCtrl.dismiss({status: "SAVE"});
    }
  }
}
