import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

import { Component, ViewChild } from '@angular/core';
import { NavController, Content, TextInput } from 'ionic-angular';

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

  @ViewChild(Content) content: Content;
  @ViewChild('newParticipantInput') newParticipantInput: TextInput;

  constructor(public navCtrl: NavController, public firebaseService:
    FirebaseServiceProvider, public  localService: LocalServiceProvider) {
    this.newTournament = localService.createNewTournament();
    this.newParticipant = new Participant();
  }

  addParticipant(){
      this.newTournament.participants.push(this.newParticipant);
      this.newParticipant = new Participant();
      this.newParticipantInput.value="";

  }

  toSettings(){
    this.navCtrl.push(SettingsPage)
  }
}
