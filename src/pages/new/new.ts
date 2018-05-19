import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

import { Component, ViewChild } from '@angular/core';
import { NavController, Content, TextInput } from 'ionic-angular';

import { Participant } from '../../classes/Participant';
import {Tournament} from "../../classes/Tournament";
import {Game} from "../../classes/Game";

@Component({
  selector: 'page-new',
  templateUrl: 'new.html'
})


export class NewPage {

  newTournament = new Tournament();

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
    let numberOfParticipants = this.newTournament.participants.length;
    let totalGames = numberOfParticipants * (numberOfParticipants - 1) / 2;
    let rounds: Array<number>=new Array(numberOfParticipants);

    for(let j=0; j<numberOfParticipants;j++){
      rounds[j]=0;
    }
    this.newTournament.games = [];

    for(let i = 0; i < totalGames; i++){
      let game = new Game();
      let valid: boolean;

      do{
        valid = true;

        let min = Math.min( ...rounds );
        do{
          game.team1 = this.randomParticipantIndex();
        }while(rounds[game.team1] >= min+1)

        let mod=0;
        let test:boolean;
        do{
          game.team2 = this.randomParticipantIndex();
        }while (game.team1 == game.team2 || ( rounds[game.team2] >= min+1
        && (numberOfParticipants % 2 == 1 && (i * 2) % numberOfParticipants == numberOfParticipants-1)))

        if(valid){
          this.newTournament.games.forEach( (item) => {
            if( ( game.team1 == item.team1 || game.team1 == item.team2 ) &&
              (game.team2 == item.team1 || game.team2 == item.team2)){
              valid = false;
            }
          });
        }
      }while (!valid)

      this.newTournament.games.push(game);
      rounds[game.team1]++;
      rounds[game.team2]++;
    }

    this.firebaseService.addTournament(this.newTournament);
  }

  randomParticipantIndex(){
    return Math.floor(Math.random() * this.newTournament.participants.length);
  }
}
