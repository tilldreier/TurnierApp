import { Component } from '@angular/core';
import {ViewController} from 'ionic-angular';
import {Notification} from "../../classes/Notification";

@Component({
  selector: 'page-setnotification',
  templateUrl: 'setnotification.html'
})
export class SetnotificationPage {
  newNotification:Notification = new Notification();

  constructor(public viewCtrl: ViewController) {}

  close() {
    this.newNotification.message = null;
    this.viewCtrl.dismiss({notification: this.newNotification});
  }

  save() {
    this.viewCtrl.dismiss({notification: this.newNotification});
  }
}
