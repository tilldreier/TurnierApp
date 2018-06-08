import {Game} from "./Game";
/**
 * Created by tilldreier on 08.06.18.
 */
export class PlayoffRound {
  static ROUNDS: Array<string> = ["Final", "Halbfinals", "Viertelfinals", "Achtelfinals"];
  static STATUS_PROV: string = "Provisorisch";
  static STATUS_FIX: string = "Fixiert";
  static STATUS_END: string = "Beendet";

  constructor(public round: number = 0,
              public roundName: string = "",
              public games: Array<Game> = [],
              public status: string = PlayoffRound.STATUS_PROV) {

  }

  setRound(round: number, teamsInPlayoffs: number) {
    this.round = round;
    this.roundName = PlayoffRound.ROUNDS[(teamsInPlayoffs / 2) - 1 - round];
  }

  getFixture() {
    let fixture: Array<Game> = [];
    if (this.games != null) {
      for (let i = 0; i < this.games.length; i++) {
        let game = this.games[i];
        if (game.score1 == null && game.score2 == null) {
          game.id = i;
          fixture.push(game);
        }
      }
    }
    return fixture;
  }

  getResults():Array<Game>{
    let results: Array<Game> = [];
    for (let i = 0; i < this.games.length; i++) {
      let game = this.games[i];
      if (game.score1 != null && game.score2 != null) {
        results.push(game);
      }
    }
    return results;
  }
}
