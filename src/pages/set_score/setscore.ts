import { Component } from '@angular/core';
import {ViewController, NavParams} from 'ionic-angular';
import {Game} from "../../classes/Game";

@Component({
  selector: 'page-setscore',
  templateUrl: 'setscore.html'
})
export class SetscorePage {
  game: Game = this.navParams.get('game');

  constructor(public navParams: NavParams, public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss({status: "CANCEL"});
  }

  save() {
    this.viewCtrl.dismiss({status: "SAVE"});
  }
}
