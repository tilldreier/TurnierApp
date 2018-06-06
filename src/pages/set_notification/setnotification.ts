import { Component } from '@angular/core';
import {ViewController} from 'ionic-angular';

@Component({
  selector: 'page-setnotification',
  templateUrl: 'setnotification.html'
})
export class SetnotificationPage {

  constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss({status: "CANCEL"});
  }

  save() {
    this.viewCtrl.dismiss({status: "SAVE"});
  }
}
