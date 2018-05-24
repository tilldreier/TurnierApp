import {Injectable} from '@angular/core';
import {Tournament} from "../../classes/Tournament";

/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalServiceProvider {
  newTournament: Tournament;

  constructor() {
  }

  createNewTournament(){
    this.newTournament = new Tournament();
    return this.newTournament;
  }
  getNewTournament() {
    return this.newTournament;
  }
}
