import { Component, ViewChild } from '@angular/core';
import {NavController, Content, TextInput, ToastController} from 'ionic-angular';

import { Participant } from '../../classes/Participant';
import {Tournament} from "../../classes/Tournament";
import {LocalServiceProvider} from "../../providers/local-service/local-service";
import {SettingsPage} from "../settings/settings";

@Component({
  selector: 'page-new',
  templateUrl: 'new.html'
})


export class NewPage {

  newTournament:Tournament;
  newParticipant:Participant;
  participantNameToast:any;

  @ViewChild(Content) content: Content;
  @ViewChild('newParticipantInput') newParticipantInput: TextInput;

  constructor(public navCtrl: NavController, public  localService: LocalServiceProvider, private toastCtrl: ToastController) {
    this.newTournament = localService.createNewTournament();
    this.newParticipant = new Participant();
  }

  addParticipant(){
    if(this.newParticipant.name === null || this.newParticipant.name === ""){
      this.toastCtrl.create({
        message: 'Bitte Namen des Teilnehmers eingeben!',
        duration: 3000,
        position: 'top'
      }).present();
    }else{
      this.newTournament.participants.push(this.newParticipant);
      this.newParticipant = new Participant();
      this.newParticipantInput.value="";
    }
  }

  toSettings(){
    if(this.newTournament.participants.length <= 2){
      this.toastCtrl.create({
        message: 'Erfasse mindestens 3 Teilnehmer!',
        duration: 3000,
        position: 'top'
      }).present();
    }else{
      this.navCtrl.push(SettingsPage);
    }
  }
}
