import {Participant} from "./Participant";
import {Game} from "./Game";
import {TournamentRules} from "./TournamentRules";
import {Ranking} from "./Ranking";
import {Notification} from "./Notification";

export class Tournament {

  constructor(public key: string = null,
              public name: string = "",
              public participants: Array<Participant> = [],
              public games: Array<Game> = [],
              public rules: TournamentRules = new TournamentRules(),
              public notification: Array<Notification> = []) {

  }

  static fromJsonList(array): Tournament[] {
    return array.map(json => Tournament.fromJson(json))
  }

  static fromJson({key, name, participants, games, rules}): Tournament {
    return new Tournament(
      key,
      name,
      participants,
      games,
      rules);
  }

  generateGamePlan() {
    let numberOfParticipants = this.participants.length;
    let totalGames = numberOfParticipants * (numberOfParticipants - 1) / 2;
    let rounds: Array<number> = new Array(numberOfParticipants);

    for (let j = 0; j < numberOfParticipants; j++) {
      rounds[j] = 0;
    }

    for (let i = 0; i < totalGames; i++) {
      let game = new Game();
      let valid: boolean;

      do {
        valid = true;

        let min = Math.min(...rounds);
        do {
          game.team1 = this.randomParticipantIndex();
        } while (rounds[game.team1] >= min + 1)

        do {
          game.team2 = this.randomParticipantIndex();
        } while (game.team1 == game.team2 || ( rounds[game.team2] >= min + 1
        && !(numberOfParticipants % 2 == 0 || (i * 2) % numberOfParticipants == numberOfParticipants - 1)))

        if (valid) {
          this.games.forEach((item) => {
            if (( game.team1 == item.team1 || game.team1 == item.team2 ) &&
              (game.team2 == item.team1 || game.team2 == item.team2)) {
              valid = false;
            }
          });
        }
      } while (!valid)

      this.games.push(game);
      rounds[game.team1]++;
      rounds[game.team2]++;
    }
  }

  randomParticipantIndex() {
    return Math.floor(Math.random() * this.participants.length);
  }

  getNextGames():Array<Game>{
    let nextGames: Array<Game> = [];
    for (let i = 0; i < this.games.length; i++) {
      let game = this.games[i];
      if (game.score1 == null && game.score2 == null) {
        this.setGameTeamName(game);
        nextGames.push(game);
      }
      if (nextGames.length == 3) {
        return nextGames;
      }
    }
    return nextGames;
  }

  getResults():Array<Game>{
    let results: Array<Game> = [];
    for (let i = 0; i < this.games.length; i++) {
      let game = this.games[i];
      if (game.score1 != null && game.score2 != null) {
        this.setGameTeamName(game);
        results.push(game);
      }
    }
    return results;
  }

  getFixture():Array<Game>{
    let fixture: Array<Game> = [];
    for (let i = 0; i < this.games.length; i++) {
      let game = this.games[i];
      if (game.score1 == null && game.score2 == null) {
        this.setGameTeamName(game);
        game.id=i;
        fixture.push(game);
      }
    }
    return fixture;
  }

  getRanking(){
    let ranking: Array<Ranking> = [];
    for (let i = 0; i < this.participants.length; i++) {
      ranking.push(new Ranking(i, this.participants[i].name));
    }

    for (let i = 0; i < this.games.length; i++) {
      let game = this.games[i];
      if (game.score1 != null && game.score2 != null) {
        game.score1=Number(game.score1);
        game.score2=Number(game.score2);
        ranking[game.team1].pointsFor+=game.score1;
        ranking[game.team1].pointsAgainst+=game.score2;
        ranking[game.team2].pointsFor+=game.score2;
        ranking[game.team2].pointsAgainst+=game.score1;

        // Team1 Wins
        if(game.score1 > game.score2){
          ranking[game.team1].wins++;
          ranking[game.team1].points+=this.rules.win;

          ranking[game.team2].losses++;
          ranking[game.team2].points+=this.rules.lose;

        // Team2 Wins
        }else if(game.score2 > game.score1){
          ranking[game.team2].wins++;
          ranking[game.team2].points+=this.rules.win;

          ranking[game.team1].losses++;
          ranking[game.team1].points+=this.rules.lose;

        // Draw
        }else{
          ranking[game.team1].draws++;
          ranking[game.team1].points+=this.rules.draw;

          ranking[game.team2].draws++;
          ranking[game.team2].points+=this.rules.draw;
        }
      }
    }

    ranking.sort(function(a, b){
      if(b.points != a.points){
        return b.points-a.points;
      }else{
        return (b.pointsFor-b.pointsAgainst)-(a.pointsFor-a.pointsAgainst);
      }

    });
    return ranking;
  }

  setGameTeamName(game){
    game.team1Name = this.participants[game.team1].name;
    game.team2Name = this.participants[game.team2].name;
  }
}
