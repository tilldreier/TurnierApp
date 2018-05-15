import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

import { Participant } from '../../classes/Participant';

import { Component, ViewChild } from '@angular/core';
import { NavController, Content, TextInput } from 'ionic-angular';

@Component({
  selector: 'page-new',
  templateUrl: 'new.html'
})


export class NewPage {

  newTournament: any = {
    name: "",
    participants: []
  }

  newParticipant = new Participant();

  @ViewChild(Content) content: Content;
  @ViewChild('newParticipantInput') newParticipantInput: TextInput;

  constructor(public navCtrl: NavController, public firebaseService:
    FirebaseServiceProvider) {
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
