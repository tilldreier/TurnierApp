import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

import { Participant } from '../../classes/Participant';

import { Component, ViewChild } from '@angular/core';
import { NavController, Content, Input } from 'ionic-angular';

@Component({
  selector: 'page-new',
  templateUrl: 'new.html'
})


export class NewPage {

  newTournament: any = {
    name: "",
    participants: []
  }

  newParticipant = new Participant()

  firebaseService:FirebaseServiceProvider

  @ViewChild(Content) content: Content;
  @ViewChild('newParticipantInput') newParticipantInput: Input;

  constructor(public navCtrl: NavController, public firebaseService:
    FirebaseServiceProvider) {
    this.firebaseService = firebaseService;
  }

  addParticipant(){
      this.newTournament.participants.push(this.newParticipant);
      this.newParticipant = new Participant();
      this.newParticipantInput.value="";

  }

  saveTournament(){
    this.firebaseService.addTournament(this.newTournament);
  }
}
